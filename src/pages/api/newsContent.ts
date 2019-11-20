import { JSDOM } from 'jsdom';
import Readability from '@hnr/readability';
import { NextApiRequest, NextApiResponse } from 'next';
import { getNewsStory } from '../../lib/apiClient';
import { NewsStory } from '../../lib/apiClient';

type NewsView = {
  url: string;
  title: string;
  content: string;
};

type NewsViewRequest = {
  id: number;
};

const getNewsContent = async (id: number): Promise<NewsView> => {
  try {
    if (!isNaN(parseInt(`${id}`))) {
      const newsMeta: NewsStory = await getNewsStory(id);
      const { url } = newsMeta;
      const dom = await JSDOM.fromURL(url);
      const reader = new Readability(dom.window.document);
      const { title, content } = reader.parse();

      return {
        url,
        title: title,
        content: content,
      };
    } else {
      throw new Error();
    }
  } catch (e) {
    throw new Error('invalid url');
  }
};

const newsContentsController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  res.setHeader('Content-Type', 'application/json');
  const { id } = req.body as NewsViewRequest;

  try {
    if (req.method === 'POST') {
      const news = await getNewsContent(id);
      if (news) {
        res.statusCode = 200;
        res.send(news);
      } else {
        throw new Error();
      }
    } else {
      throw new Error('invalid request');
    }
  } catch (e) {
    console.log('[newsContentsController]', e);
    res.statusCode = 400;
    res.send({
      error: e.message,
    });
  }
};

export default newsContentsController;

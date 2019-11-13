import { JSDOM } from 'jsdom';
import Readability from '@hnr/readability';
import { NextApiRequest, NextApiResponse } from 'next';

type NewsView = {
  title: string;
  content: string;
};

type NewsViewRequest = {
  url: string;
};

const getNewsContent = async (url: string): Promise<NewsView> => {
  try {
    if (url && url.length > 0) {
      const dom = await JSDOM.fromURL(url);
      const reader = new Readability(dom.window.document);
      const { title, content } = reader.parse();

      return {
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
  const { url } = req.body as NewsViewRequest;

  try {
    if (req.method === 'POST') {
      const news = await getNewsContent(url);
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

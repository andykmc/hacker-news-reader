import { JSDOM } from 'jsdom';
import Readability from '@hnr/readability';
import { NextApiRequest, NextApiResponse } from 'next';

type StoryView = {
  title: string;
  content: string;
};

type StoryViewRequest = {
  url: string;
};

const getStoryContent = async (url: string): Promise<StoryView> => {
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

const storyContentsController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  res.setHeader('Content-Type', 'application/json');
  const { url } = req.body as StoryViewRequest;

  try {
    if (req.method === 'POST') {
      const story = await getStoryContent(url);
      if (story) {
        res.statusCode = 200;
        res.send(story);
      } else {
        throw new Error();
      }
    } else {
      throw new Error('invalid request');
    }
  } catch (e) {
    console.log('[storyContentsController]', e);
    res.statusCode = 400;
    res.send({
      error: e.message,
    });
  }
};

export default storyContentsController;

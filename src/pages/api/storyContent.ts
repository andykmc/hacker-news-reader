import { JSDOM } from 'jsdom';
import Readability from 'mozilla-readability';

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
      let reader = new Readability(dom.window.document);
      let { title, content } = reader.parse();

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

export default async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const { url } = <StoryViewRequest>req.body;

  try {
    if (req.method === 'POST') {
      const story = await getStoryContent(url);
      if (!!story) {
        res.statusCode = 200;
        res.send(story);
      } else {
        throw new Error();
      }
    } else {
      throw new Error('invalid request method');
    }
  } catch (e) {
    res.statusCode = 400;
    res.send({
      error: e.message,
    });
  }
};

import axios from 'axios';

enum NewsStoryType {
  Job = 'job',
  Story = 'story',
  Comment = 'comment',
  Poll = 'poll',
  Pollopt = 'pollopt',
}

// Duplicated with NewsMeta Type
export type NewsStory = {
  id: number;
  deleted: boolean;
  type: NewsStoryType;
  by: string;
  time: number;
  text: string;
  dead: boolean;
  parent: number;
  poll: number;
  kids: number[];
  url: string;
  score: number;
  title: string;
  parts: number[];
  descendants: number;
};

export const getNewsStory = async (id: number): Promise<NewsStory> => {
  const response = await axios.get(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  return response.data;
};

export const getAllTopNews = async (): Promise<NewsStory[]> => {
  const response = await axios.get(
    'https://hacker-news.firebaseio.com/v0/topstories.json'
  );
  const allIds = await response.data;
  return <NewsStory[]>await Promise.all(
    allIds.slice(0, 20).map(async (id: number) => {
      return await getNewsStory(id);
    })
  );
};

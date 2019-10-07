import React, { useState, useEffect } from 'react';
import NewsList from '../components/NewsList';
import NewsStoryView from '../components/NewsStoryView';
import { getAllTopNews, NewsStory } from '../lib/apiClient';
import styled from 'styled-components';

type Props = {
  userAgent?: string;
};

const IndexWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const IndexContainer: React.FunctionComponent<Props> = ({ userAgent }) => {
  const newsItems = useNewsItems();
  const [storyUrlOnView, setStoryUrlOnView] = useState('');

  const handleNewsItemClick = (url: string) => {
    setStoryUrlOnView(url);
  };

  return (
    <IndexWrapper>
      <NewsList items={newsItems} onClick={handleNewsItemClick}></NewsList>
      <NewsStoryView storyUrl={storyUrlOnView}></NewsStoryView>
    </IndexWrapper>
  );
};

const useNewsItems = () => {
  const [newsItems, setNewsItems] = useState<NewsStory[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const items = await getAllTopNews();
      setNewsItems(items);
    };
    fetch();
  }, []);
  return newsItems;
};

export default IndexContainer;

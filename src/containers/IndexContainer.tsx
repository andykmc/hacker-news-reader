import React, { useState, useEffect } from 'react';
import { Drawer, SwipeableDrawer, Hidden, Button } from '@material-ui/core';
import NewsList from '../components/NewsList';
import NewsStoryView from '../components/NewsStoryView';
import { getAllTopNews, NewsStory } from '../lib/apiClient';
import styled from 'styled-components';

type Props = {
  userAgent?: string;
};

const IndexWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto 36px;
`;

const OpenButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
`;

const OpenButton = styled(Button)`
  background: lightgreen;
`;

const IndexContainer: React.FunctionComponent<Props> = ({ userAgent }) => {
  const newsItems = useNewsItems();
  const [storyUrlOnView, setStoryUrlOnView] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleNewsItemClick = (url: string) => {
    setStoryUrlOnView(url);
    setIsDrawerOpen(false);
  };

  const handleDrawerToggle = (isOpen: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsDrawerOpen(isOpen);
  };

  return (
    <IndexWrapper>
      <Hidden smDown>
        <Drawer variant="permanent" open>
          <NewsList items={newsItems} onClick={handleNewsItemClick}></NewsList>
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <Drawer
          anchor="bottom"
          open={isDrawerOpen}
          onClose={handleDrawerToggle(false)}
        >
          <Button onClick={handleDrawerToggle(false)}>Close</Button>
          <NewsList items={newsItems} onClick={handleNewsItemClick}></NewsList>
        </Drawer>
        <OpenButtonWrapper>
          <OpenButton onClick={handleDrawerToggle(true)} fullWidth>
            Open
          </OpenButton>
        </OpenButtonWrapper>
      </Hidden>
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

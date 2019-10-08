import React, { useState, useEffect } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleNewsItemClick = (url: string) => {
    setStoryUrlOnView(url);
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
        <SwipeableDrawer
          anchor="bottom"
          open={isDrawerOpen}
          onClose={handleDrawerToggle(false)}
          onOpen={handleDrawerToggle(true)}
          disableSwipeToOpen={false}
        >
          <NewsList items={newsItems} onClick={handleNewsItemClick}></NewsList>
        </SwipeableDrawer>
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

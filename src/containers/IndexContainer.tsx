import React, { useState } from 'react';
import { Drawer, Hidden, Button } from '@material-ui/core';
import NewsList from '../components/NewsList';
import NewsView from '../components/NewsView';
import styled from 'styled-components';

type Props = {};

const IndexWrapper = styled.div`
  max-width: 1560px;
  margin: 0 auto 36px;
`;

const LeftDrawer = styled(Drawer)`
  .MuiDrawer-paperAnchorDockedLeft {
    left: auto;
  }
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

const IndexContainer: React.FC<Props> = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleNewsItemClick = () => {
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
        <LeftDrawer variant="permanent" open>
          <NewsList onClick={handleNewsItemClick} />
        </LeftDrawer>
      </Hidden>
      <Hidden mdUp>
        <Drawer
          anchor="bottom"
          open={isDrawerOpen}
          onClose={handleDrawerToggle(false)}
        >
          <Button onClick={handleDrawerToggle(false)}>Close</Button>
          <NewsList onClick={handleNewsItemClick} />
        </Drawer>
        <OpenButtonWrapper>
          <OpenButton onClick={handleDrawerToggle(true)} fullWidth>
            Open
          </OpenButton>
        </OpenButtonWrapper>
      </Hidden>
      <NewsView />
    </IndexWrapper>
  );
};

export default IndexContainer;

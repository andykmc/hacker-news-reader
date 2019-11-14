import React, { useState } from 'react';
import { Drawer, Hidden, Button } from '@material-ui/core';
import NewsList from '../components/NewsList';
import NewsView from '../components/NewsView';
import styled from 'styled-components';
import { useScreenSize } from '../lib/hooks';

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
  const isSmDown = useScreenSize.isSmallOrDown();
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
      <div hidden={isSmDown}>
        <LeftDrawer variant="permanent" open>
          <NewsList onClick={handleNewsItemClick} />
        </LeftDrawer>
      </div>
      <div hidden={!isSmDown}>
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
      </div>
      <NewsView />
    </IndexWrapper>
  );
};

export default IndexContainer;

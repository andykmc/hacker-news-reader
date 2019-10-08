import React from 'react';
import { NewsStory } from '../lib/apiClient';
import styled from 'styled-components';
import { useScreenSize } from '../lib/hooks';

type Props = {
  items: NewsStory[];
  onClick: Function;
};

type WrapperProps = {
  isSmDown: boolean;
};

const Wrapper = styled.div<WrapperProps>`
  position: ${props => (props.isSmDown ? 'initial' : 'fixed')};
  height: 100%;
  overflow-y: auto;
  width: ${props =>
    props.isSmDown ? '100%' : props.theme.overhaul.newsListWidth + 'px'};
  background: white;
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const ListItem = styled.li`
  padding: 5px 10px 5px;
  border-bottom: 1px solid grey;

  &:hover {
    background: lightgrey;
  }
`;

const NewsList: React.FunctionComponent<Props> = ({ items, onClick }) => {
  const isSmDown = useScreenSize.isSmallOrDown();
  return (
    <Wrapper isSmDown={isSmDown}>
      <List>
        {items.length > 0 &&
          items.map(item => (
            <ListItem key={item.id}>
              <a
                href={item.url}
                onClick={e => {
                  e.preventDefault();
                  onClick(item.url);
                }}
              >
                {item.title}
              </a>
            </ListItem>
          ))}
      </List>
    </Wrapper>
  );
};
export default NewsList;

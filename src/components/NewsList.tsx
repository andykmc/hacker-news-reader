import React from 'react';
import { NewsStory } from '../lib/apiClient';
import styled from 'styled-components';

type Props = {
  items: NewsStory[];
  onClick: Function;
};

const Wrapper = styled.div`
  position: fixed;
  height: 100%;
  overflow-y: auto;
  width: ${props => props.theme.overhaul.newsListWidth}px;
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const ListItem = styled.li`
  padding: 5px 0 5px;
  border-bottom: 1px solid grey;
`;

const NewsList: React.FunctionComponent<Props> = ({ items, onClick }) => (
  <Wrapper>
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
ListItem;
export default NewsList;

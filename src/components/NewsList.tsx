import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import { useScreenSize } from '../lib/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { changeNewsInViewAction } from '../redux/actions';
import { AppState } from '../redux/reducers';

type Props = {
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

const NewsList: React.FC<Props> = ({ onClick }) => {
  const isSmDown = useScreenSize.isSmallOrDown();
  const isLoading = useSelector((state: AppState) => state.newsList.isLoading);
  const newsList = useSelector((state: AppState) => state.newsList.list);
  const dispatch = useDispatch();

  return (
    <Wrapper isSmDown={isSmDown}>
      {isLoading ? (
        'Loading...'
      ) : (
        <List>
          {newsList.map(news => (
            <ListItem key={news.id}>
              <Link href={`/news/${news.id}`}>
                <a
                  // href={item.url}
                  onClick={e => {
                    e.preventDefault();
                    onClick();
                    // Router.push(`/news/${news.id}`);
                    window.history.pushState({}, '', `/news/${news.id}`);
                    dispatch(
                      changeNewsInViewAction({
                        id: news.id,
                      })
                    );
                  }}
                >
                  {news.title}
                </a>
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </Wrapper>
  );
};

export default NewsList;

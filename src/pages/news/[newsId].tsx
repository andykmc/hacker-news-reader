import React from 'react';
import { NextPage } from 'next';
import IndexContainer from '../../containers/IndexContainer';
import { connect } from 'react-redux';
import { getNewsListAction, changeNewsInViewAction } from '../../redux/actions';

type Props = {
  userAgent?: string;
};

const NewsPage = ({ userAgent }) => <IndexContainer />;

NewsPage.getInitialProps = async ({ req, query, store }) => {
  const { newsId } = query;
  console.log('newsId', newsId);

  await store.dispatch(getNewsListAction());
  await store.dispatch(
    changeNewsInViewAction({
      id: newsId,
    })
  );

  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { userAgent };
};

export default connect()(NewsPage);

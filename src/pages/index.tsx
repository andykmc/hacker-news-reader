import React from 'react';
import { NextPage } from 'next';
import IndexContainer from '../containers/IndexContainer';
import { getNewsListAction } from '../redux/actions';
import { connect } from 'react-redux';

type Props = {
  userAgent?: string;
};

const IndexPage = () => <IndexContainer />;

IndexPage.getInitialProps = async ({ req, store }) => {
  await store.dispatch(getNewsListAction());
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { userAgent };
};

export default connect()(IndexPage);

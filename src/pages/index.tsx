import React from 'react';
import { NextPage } from 'next';
import IndexContainer from '../containers/IndexContainer';
import { getNewsListAction } from '../redux/actions';
import { connect } from 'react-redux';

type Props = {
  userAgent?: string;
};

const IndexPage = ({ userAgent }) => <IndexContainer />;

IndexPage.getInitialProps = async ({ req, store }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  // store.dispatch(getNewsListAction());
  return { userAgent };
};

export default IndexPage;

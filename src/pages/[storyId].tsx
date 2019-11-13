import React from 'react';
import { NextPage } from 'next';
import IndexContainer from '../containers/IndexContainer';
import { connect } from 'react-redux';

type Props = {
  userAgent?: string;
};

const NewsPage = ({ userAgent }) => <IndexContainer />;

NewsPage.getInitialProps = async ({ req, query, reduxStore }) => {
  const { storyId } = query;
  console.log(storyId);
  console.log(reduxStore);

  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { userAgent };
};

export default connect()(NewsPage);

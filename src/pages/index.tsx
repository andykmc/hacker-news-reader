import React from 'react';
import { NextPage } from 'next';
import IndexContainer from '../containers/IndexContainer';
import { StylesProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import store from '../redux/store';

type Props = {
  userAgent?: string;
};

const IndexPage: NextPage<Props> = ({ userAgent }) => (
  <Provider store={store}>
    <StylesProvider injectFirst>
      <IndexContainer></IndexContainer>
    </StylesProvider>
  </Provider>
);

IndexPage.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { userAgent };
};

export default IndexPage;

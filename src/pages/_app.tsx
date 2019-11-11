import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'styled-components';
import { readerTheme as theme } from '../common/theme';
import { Provider } from 'react-redux';
import { StylesProvider } from '@material-ui/core';

import store from '../redux/store';

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </StylesProvider>
      </Provider>
    );
  }
}

export default MyApp;

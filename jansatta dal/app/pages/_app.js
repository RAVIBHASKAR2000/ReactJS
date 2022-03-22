import React from 'react';
import Head from 'next/head';
import { ToastProvider } from 'react-toast-notifications';
import { ApolloProvider } from '@apollo/react-hooks';

import { AuthProvider } from '../lib/authentication';
import StylesBase from '../primitives/StylesBase';
import { useApollo } from '../lib/apolloClient';

const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ToastProvider>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <Head>
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
            />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          </Head>
          <StylesBase />
          <Component {...pageProps} />
        </AuthProvider>
      </ApolloProvider>
    </ToastProvider>
  );
};

export default MyApp;

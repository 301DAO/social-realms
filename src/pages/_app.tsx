//import '../../scripts/wdyr';
import Head from 'next/head';
import * as React from 'react';
import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import { Layout } from '@/components/layouts';
import { ReactQueryProvider, Web3Provider } from '@/providers';
import { useSwitchToEthereum, useDetectAccountChange } from '@/hooks';

const App = ({ Component, pageProps }: AppProps) => {
  useDetectAccountChange();
  useSwitchToEthereum();

  return (
    <>
      <Head>
        <title>Social Realms</title>
      </Head>
      <ReactQueryProvider dehydrateState={pageProps.dehydrateState}>
        <Web3Provider>
          <Layout>{Component.name != 'PageNotFound' && <Component {...pageProps} />}</Layout>
        </Web3Provider>
      </ReactQueryProvider>
    </>
  );
};

export default App;

// Ucomment this for nextjs metrics
// import { NextWebVitalsMetric } from 'next/app'
// export const reportWebVitals = (metric: NextWebVitalsMetric) =>
//   console.table(metric)

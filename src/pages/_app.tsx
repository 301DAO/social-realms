import Head from 'next/head';
import * as React from 'react';
import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import { Layout } from '@/components/layouts';
import { ReactQueryProvider, WagmiProvider } from '@/providers';
import { useSwitchToEthereum, useDetectAccountChange } from '@/hooks';

// uncomment this import in dev if you want to know 'why did you render'
//import '../../scripts/wdyr';

const App = ({ Component, pageProps }: AppProps) => {
  useDetectAccountChange();
  useSwitchToEthereum();

  return (
    <>
      <Head>
        <title>Social Realms</title>
      </Head>
      <ReactQueryProvider dehydrateState={pageProps.dehydrateState}>
        <WagmiProvider>
          <Layout>{Component.name != 'PageNotFound' && <Component {...pageProps} />}</Layout>
        </WagmiProvider>
      </ReactQueryProvider>
    </>
  );
};

export default App;

// Ucomment this for nextjs metrics
// import { NextWebVitalsMetric } from 'next/app'
// export const reportWebVitals = (metric: NextWebVitalsMetric) =>
//   console.table(metric)

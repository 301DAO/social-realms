//import '../../scripts/wdyr';
import Head from 'next/head';
import * as React from 'react';
import type { AppProps } from 'next/app';
import { useSwitchToEthereum } from '@/hooks';
import { Layout } from '@/components/layouts';
import '@/styles/globals.css';
import { ReactQueryProvider, Web3Provider } from '@/providers';

const App = ({ Component, pageProps }: AppProps) => {
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

export default App; // dynamic(() => Promise.resolve(App), { ssr: false });

// Ucomment this for nextjs metrics
// import { NextWebVitalsMetric } from 'next/app'
// export const reportWebVitals = (metric: NextWebVitalsMetric) =>
//   console.table(metric)

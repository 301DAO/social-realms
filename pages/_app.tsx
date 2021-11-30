// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/components/layout' or its co... Remove this comment to see the full error message
import Layout from "@/components/layout";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/contexts/CeramicContext' or ... Remove this comment to see the full error message
import { CeramicContextWrapper } from "@/contexts/CeramicContext";
import "@/styles/globals.css";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import Head from "next/head";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};
// TODO: add respectable logging
export default function Root({
  Component,
  pageProps
}: any) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Head>
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <title>My Realm</title>
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <meta name="description" content="" />
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐦</text></svg>"
        />
      </Head>
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Web3ReactProvider
        getLibrary={getLibrary}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ getLibrary: (provider: any) => Web3Provide... Remove this comment to see the full error message
        libraryName={"ethers.js" | "web3.js" | null}
      >
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <CeramicContextWrapper>
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <QueryClientProvider client={queryClient}>
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Hydrate state={pageProps.dehydratedState}>
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Layout>
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Component {...pageProps} />
              </Layout>
            </Hydrate>
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </CeramicContextWrapper>
      </Web3ReactProvider>
    </>
  );
}

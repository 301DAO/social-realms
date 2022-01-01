import Layout from '@/components/layout'
import { TextileProvider } from '@/contexts/textile-context'
import { useHasMounted } from '@/hooks/use-has-mounted'
import { lazyImport } from '@/hooks/use-named-lazy-import'
import { useSwitchToEthereum } from '@/hooks/use-switch-to-ethereum'
import '@/styles/globals.css'
import { Web3Provider } from '@ethersproject/providers'
import withTwind from '@twind/next/app'
import { Web3ReactProvider } from '@web3-react/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import twindConfig from 'twind.config.js'
const { Toaster } = lazyImport(() => import('react-hot-toast'), 'Toaster')

const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())
  // checks if network is ethereum, if not then throw toast and prompt to switch to ethereum
  useSwitchToEthereum()
  const hasMounted = useHasMounted()
  if (!hasMounted) return <p>loading</p>
  return (
    <>
      <Head>
        <title>Social Realms</title>
        <meta name="description" content="" />

      </Head>
      <QueryClientProvider client={queryClient}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <TextileProvider>
            <Hydrate state={pageProps.dehydratedState}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Hydrate>
          </TextileProvider>
        </Web3ReactProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <React.Suspense fallback={<div>loading . . .</div>}>
        <Toaster />
      </React.Suspense>
    </>
  )
}

export default withTwind(twindConfig, App)

// Ucomment this for nextjs metrics
// export const reportWebVitals = (metric: NextWebVitalsMetric) =>
//   console.table(metric)

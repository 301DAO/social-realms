declare const window: any
import Layout from '@/components/layout'
import { TextileProvider } from '@/contexts/TextileContext'
import { lazyImport } from '@/hooks/use-named-lazy-import'
import '@/styles/globals.css'
import { networks } from '@/wallet/constants'
import { switchNetwork } from '@/wallet/utils'
import { Web3Provider } from '@ethersproject/providers'
import withTwind from '@twind/next/app'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
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
  //console.log(pageProps);

  const [queryClient] = React.useState(() => new QueryClient())

  const { active, chainId } = useWeb3React()

  React.useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('chainChanged', (chainId: string) => {
        if (chainId != networks.ethereum.chainId) {
          switchNetwork()
          import('react-hot-toast').then(({ toast }) => {
            toast('Switch to Ethereum Mainnet', {
              position: 'bottom-right',
              style: {
                background: '#f44336',
                color: '#fff',
              },
              duration: 3000,
            })
          })
        }
      })
    }
  }, [chainId])

  const [hasMounted, setHasMounted] = React.useState(false)
  React.useEffect(() => {
    setHasMounted(true)
    return () => {
      setHasMounted(false)
    }
  }, [])
  if (!hasMounted) return <p>loading</p>
  console.log(active)

  return (
    <>
      <Head>
        <title>Social Realms</title>
        <meta name="description" content="" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐦</text></svg>"
        />
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

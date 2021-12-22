import Layout from '@/components/layout'
import { TextileProvider } from '@/contexts/TextileContext'
import { useHasMounted, useIsFirstRender } from '@/hooks/index'
import '@/styles/globals.css'
import { switchNetwork } from '@/wallet/util'
import { Web3Provider } from '@ethersproject/providers'
import withTwind from '@twind/next/app'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as React from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import twindConfig from 'twind.config.js'
const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function Root({ Component, pageProps }: AppProps) {
  const [ queryClient ] = React.useState(() => new QueryClient())
  const router = useRouter()
  const { chainId } = useWeb3React()
  const isFirstRender = useIsFirstRender()
  const _hasMounted = useHasMounted()

  React.useEffect(() => {
    if (isFirstRender) {
      console.log('isFirstRender', isFirstRender)
    }
  }, [])
  // Switch to Ethereum network if necessary
  React.useEffect(() => {
    if (chainId === 1) return
    switchNetwork()
  }, [ chainId, router ])

  const [ hasMounted, setHasMounted ] = React.useState(false)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasMounted(true)
    }
  }, [])

  if (!hasMounted) return <p>loading</p>
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
      {hasMounted && (
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
      )}
    </>
  )
}
export default withTwind(twindConfig, Root)

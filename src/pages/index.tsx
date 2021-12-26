import type { GetServerSideProps, NextPage } from 'next'
import * as React from 'react'
import { toast } from 'react-hot-toast'
import { tw } from 'twind'
import { utils, providers, getDefaultProvider } from 'ethers'

export const getServerSideProps: GetServerSideProps = async context => {
  //console.log(window);

  return {
    props: {
      test: context.locale || null,
    }
  }
}

const Index: NextPage = () => {
  const provider = getDefaultProvider()
  const address = '0x8d12A197cB00D4747a1fe03395095ce2A5CC6819'
  const balance = provider.getBalance(address)
  balance.then(console.log)
  //console.log(`balance ${balance}`);

  const toaster = () => toast('test it')

  // listen to wallet disconnecting
  // React.useEffect(() => {

  //    const signTyped =  window.ethereum.request({
  //       method: 'eth_signTypedData',
  //       params: [
  //        [ {
  //           type: 'string',
  //           value: 'hello',
  //           name: 'essage',
  //         }],
  //         '0x9FB7E6090096C3A0a6b085C8e33d99e5610234fa',
  //       ],
  //     })
  //     signTyped.then(console.log)
  // }, [])

  // if (typeof window.ethereum !== 'undefined') {
  //   window.ethereum.on('chainChanged', chainId => {})
  // }
  return (
    <div
      className={tw`flex flex-col items-center justify-center align-middle px-9 font-[Inter]
        text-center text-6xl font-extrabold tracking-tighter leading-[1.1] sm:text-7xl lg:text-8xl xl:text-8xl
        `}
    >
      <p
        className={tw(
          'text-8xl font-extrabold pb-8 text-center tracking-tight leading-[1.1] sm:text-9xl lg:text-10xl xl:text-10xl',
          ' inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-500'
        )}
      >
        Social Realms.
      </p>
      <div
        className={tw(
          `space-y-8 text-3xl font-extrabold subpixel-antialiased tracking-wide leading-10 text-center`,
          `dark:text-gray-300`
        )}
      >
        <p>
          Follow your favorite addresses in{' '}
          <span className="underline decoration-slate-50">Crypto</span>
        </p>
        <p>
          Lookup anyone by their{' '}
          <span className="underline decoration-slate-50">ENS</span> or{' '}
          <span className="underline decoration-slate-50">Ethereum</span>{' '}
          address
        </p>
      </div>
    </div>
  )
}
export default Index

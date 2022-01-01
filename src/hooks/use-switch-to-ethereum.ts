// export const useSwitchNetworkToast = () =>
//   import('react-hot-toast').then(({ toast }) => {
//     toast(
//       'Your wallet is connected to the wrong network, please connect it to Ethereum mainnet',
//       {
//         position: 'bottom-right',
//         style: {
//           background: '#f44336',
//           color: '#fff',
//         },
//         duration: 3000,
//       }
//     )
//   })

declare const window: any
import { networks } from '@/wallet/constants'
import { switchNetwork } from '@/wallet/utils'
import * as React from 'react'

const switchNetworkToast = () =>
  import('react-hot-toast').then(({ toast }) => {
    toast(
      'Your wallet is connected to the wrong network, please connect it to Ethereum mainnet',
      {
        position: 'bottom-right',
        style: {
          background: '#f44336',
          color: '#fff',
        },
        duration: 3000,
      }
    )
  })

export const useSwitchToEthereum = () => {
  return React.useEffect(() => {
    if (window.ethereum.chainId !== networks.ethereum.chainId) {
      switchNetwork()
      switchNetworkToast()
    }
    window.ethereum.on('chainChanged', (chainId: string) => {
      if (chainId != networks.ethereum.chainId) {
        switchNetwork()
        switchNetworkToast()
      }
    })
  }, [])
}

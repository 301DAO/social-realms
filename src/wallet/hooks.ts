import { useWeb3React } from '@web3-react/core'
import * as React from 'react'
import { injectedConnector } from './connectors'
declare const window: any


export const useSignMessage = (message: string) => {
  const { library, account } = useWeb3React()
  const [ signature, setSignature ] = React.useState<string | undefined>(
    undefined
  )

  const onSign = React.useCallback(async () => {
    if (!window.ethereum) return
    try {
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [ account, message ],
      })
      setSignature(signature)
    } catch (error) {
      if ((error as any).code === 4001) {
        console.log('User denied request')
      }
      console.error(JSON.stringify(error))
    }
  }, [ account, message ])

  React.useEffect(() => {
    if (window.ethereum && library) {
      onSign()
    }
  }, [])

  return signature
}

// "Eager connect" is to store connectorId in localStorage
export const useEagerConnect = () => {
  const { activate, active } = useWeb3React()
  const [ tried, setTried ] = React.useState(false)

  React.useEffect(() => {
    injectedConnector.isAuthorized().then((isAuthorized: boolean) => {
      if (isAuthorized) {
        activate(injectedConnector, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        setTried(true)
      }
    })
  }, [])

  React.useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [ tried, active ])
  return tried
}

export const useInactiveListener = (suppress: boolean = false) => {
  const { active, error, activate } = useWeb3React()

  React.useEffect(() => {
    const { ethereum } = window as any

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        console.log("handling 'connect' event..")
        activate(injectedConnector)
      }
      const handleChainChanged = (chainId: string | number) => {
        console.log(`handling 'chainChanged' event..: ${chainId}`)
        activate(injectedConnector)
      }
      const handleAccountsChanged = (accounts: string[]) => {
        console.log(`handling 'accountsChanged' event with payload ${accounts}`)
        if (accounts.length > 0) {
          activate(injectedConnector)
        }
      }

      ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }
  }, [ active, error, suppress, activate ])
}

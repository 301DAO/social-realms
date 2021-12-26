import { injectedConnector } from '@/wallet/connectors'
import { useEagerConnect, useInactiveListener } from '@/wallet/hooks'
import type { Web3Provider } from '@ethersproject/providers'
import { LogoutIcon } from '@heroicons/react/outline'
import { useWeb3React } from '@web3-react/core'
import * as React from 'react'
import { toast } from 'react-hot-toast'
import { tw } from 'twind'
import {useRouter} from 'next/router'
export function WalletNav() {
  const _toast = () => toast('test it')
  const router = useRouter()
  const { active, connector, account, activate, deactivate } =
    useWeb3React<Web3Provider>()

  const [buttonText, setButtonText] = React.useState('Connect Wallet')

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  const connectWallet = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const address = await injectedConnector.getAccount()
    const elipsedAddress = `${address?.slice(0, 6)}......${address?.slice(-6)}`
    if (active) {
      account && navigator.clipboard.writeText(account)
      setButtonText('Copied')
      setTimeout(() => {
        setButtonText(elipsedAddress)
      }, 300)
    } else {
      setActivatingConnector(injectedConnector)
      activate(injectedConnector)
      setButtonText(elipsedAddress),
      (window as any).address = address
    }
  }
  const disconnectWallet = async () => {
    deactivate()
    setButtonText('Connect Wallet')
    //router.replace('/')
  }

  React.useEffect(() => {
    const elipsedAddress = `${account?.slice(0, 6)}......${account?.slice(-6)}`
    if (active) setButtonText(elipsedAddress)
  }, [account, active])



  return (
    <>
      <ul
        className={tw(
          'flex items-center space-x-4 text-sm font-semibold leading-6 text-gray-700 hover:text-black ',
          'dark:text-gray-200'
        )}
      >
        {/* Connect wallet button */}
        <li>
          <button
            onClick={connectWallet}
            className={tw(
              'flex w-[160px] items-center justify-center px-5 font-semibold text-white bg-[#0c0c0c] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md border rounded-lg h-11 hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50',
              'dark:bg-gray-700 dark:focus:ring-2 dark:focus:ring-gray-900 dark:focus:ring-offset-2 dark:focus:ring-offset-gray-900 dark:hover:bg-gray-900 dark:focus:bg-gray-700'
            )}
          >
            {buttonText}
          </button>
        </li>
        {active && (
          <li className="flex">
            <button onClick={disconnectWallet}>
              <LogoutIcon className="w-7 dark:text-gray-400" id="logout-icon" />
            </button>
          </li>
        )}
      </ul>
    </>
  )
}

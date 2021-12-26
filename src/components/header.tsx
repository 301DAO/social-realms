import { SearchBar } from '@/components/search-bar'
import { WalletNav } from '@/components/wallet-nav'
import { useWeb3React } from '@web3-react/core'
import Link from 'next/link'
import * as React from 'react'
import { tw } from 'twind'

// ~39ms
// import dynamic from 'next/dynamic'
// const WalletModal = dynamic(() => import('@/components/wallet-modal'))
// const SearchBarModal = dynamic(() => import('@/components/search-bar-modal'))

// ~ 40ms
const WalletModal = React.lazy(() => import('@/components/wallet-modal'))
const SearchBarModal = React.lazy(() => import('@/components/search-bar-modal'))

// import WalletModal from '@/components/wallet-modal'
// import SearchBarModal from './search-bar-modal'

// const { WalletModal } = lazyImport(
//   () => import('./wallet-modal'), 'WalletModal')

// const { SearchBarModal } = lazyImport(
//   () => import('./search-bar-modal'),
//   'SearchBarModal'
// )
export default function Header() {
  const { active, error, chainId } = useWeb3React()
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-[1px] flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-gray-900/10 supports-backdrop-blur:bg-white/60">
      <div className="mx-auto max-w-8xl">
        <div className="py-4 mx-4 border-b h-18 border-gray-900/10 lg:px-7 lg:border-0 lg:mx-0">
          <div className="relative flex items-center">
            <Link href="/">
              <a className="flex-none mr-2 overflow-hidden text-3xl md:w-auto">
                <span className="sr-only">Social Realms</span>
                <p className="">🐦</p>
              </a>
            </Link>

            {active && (
              <>
                <nav className="flex md:mr-auto mr-auto lg:block pl-2">
                  <ul
                    className={tw(
                      `flex space-x-5 md:text-sm text-lg font-semibold leading-6 text-gray-700 px-2`,
                      `dark:text-gray-300`
                    )}
                  >
                    <li>
                      <Link href="/profile">
                        <a
                          className={tw(
                            `hover:text-black`,
                            `dark:hover:text-gray-50`
                          )}
                        >
                          My Page
                        </a>
                      </Link>
                    </li>
                    <li className="text-gray-300 font-extralight select-none">
                      |
                    </li>
                    <li>
                      <Link href="/feed">
                        <a
                          className={tw(
                            `hover:text-black`,
                            `dark:hover:text-gray-50`
                          )}
                        >
                          Feed
                        </a>
                      </Link>
                    </li>
                  </ul>
                </nav>
                <div
                  className={tw(
                    'mx-auto items-center hidden md:w-[38%] lg:w-[29rem] px-3 ml-auto space-x-3 text-left text-gray-600 bg-white rounded-lg shadow-sm h-11 md:flex ring-1 ring-gray-900/10 hover:ring-gray-300',
                    'dark:bg-gray-100 dark:active:bg-white'
                  )}
                >
                  <SearchBar />
                </div>
              </>
            )}
            <nav className={tw('hidden ml-auto md:block pl-1')}>
              <WalletNav />
            </nav>
            <div className="ml-auto -my-1 md:hidden">
              <React.Suspense fallback={<div></div>}>
                <SearchBarModal />
              </React.Suspense>
            </div>
            <div className="ml-2 -my-1 md:hidden">
              <React.Suspense fallback={<div></div>}>
                <WalletModal />
              </React.Suspense>
            </div>
            <div className="flex pl-4">
              <span
                className={tw(
                  'w-3 h-3 rounded-full',
                  active && chainId === 1 && 'bg-green-300',
                  error && 'bg-red-400',
                  chainId !== 1 && 'bg-orange-200'
                )}
              ></span>
            </div>
          </div>
        </div>

        {/* <div className="flex items-center p-4 border-b border-gray-900/10 lg:hidden">
          <button type="button" className="text-gray-500 hover:text-gray-600">
            <span className="sr-only">Navigation</span>
            <svg width="24" height="24">
              <path
                d="M5 6h14M5 12h14M5 18h14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              ></path>
            </svg>
          </button>
        </div> */}
      </div>
    </header>
  )
}

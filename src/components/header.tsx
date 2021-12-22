import { socialLinks } from '@/components/social-items'
import { WalletNav } from '@/components/wallet-nav'
import { Dialog, Transition } from '@headlessui/react'
import { useWeb3React } from '@web3-react/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { tw } from 'twind'
const WalletModal = () => {
  const [ open, setIsOpen ] = React.useState(false)

  const showModal = () => {
    setIsOpen(true)
  }

  const hideModal = () => {
    setIsOpen(false)
  }
  return (
    <>
      <button
        onClick={showModal}
        type="button"
        className={tw(
          `flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-600`,
          `dark:text-gray-200`
        )}
      >
        <span className="sr-only">Navigation</span>
        <svg width="24" height="24" fill="none" aria-hidden="true">
          <path
            d="M12 6v.01M12 12v.01M12 18v.01M12 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      <Transition appear show={open} as={React.Fragment}>
        <Dialog
          onClose={hideModal}
          className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-[1px]"
        >
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-10" />
            </Transition.Child>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="fixed w-full max-w-[14.8rem] text-base font-semibold text-gray-900 bg-white rounded-lg shadow-lg top-14 right-6">
                <Dialog.Title as="div" className="flex p-6 justify-evenly">
                  <WalletNav />
                </Dialog.Title>
                {/* Dialog footer */}
                <div className="flex p-2.5 bg-gray-100 rounded-lg justify-evenly">
                  {socialLinks.map(item => (
                    <a
                      key={item.name}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

const SearchBarModal = () => {
  const [ open, setIsOpen ] = React.useState(false)

  const showModal = async () => {
    setIsOpen(true)
  }

  const hideModal = () => {
    setIsOpen(false)
  }

  const router = useRouter()
  const searchText = React.useRef<HTMLInputElement>(null)

  const onSearchClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      hideModal()
      const search = searchText?.current?.value
      if (!search) return
      router.push(`/user?address=${search}`)
    },
    [ searchText ]
  )

  const onEnter = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return
      event.preventDefault()
      hideModal()
      const search = searchText?.current?.value
      if (!search) return
      router.push(`/user?address=${search}`)
    },
    [ searchText ]
  )

  const showOnCmdK = async () => {
    const keysPressed: { [key: string]: boolean } = {}
    document.onkeydown = async (event: KeyboardEvent) => {
      keysPressed[event.key] = true
      if (keysPressed['Meta'] && event.key === 'k') {
        setTimeout(async () => {
          await showModal()
          searchText?.current?.focus()
        }, 0)
      }
    }
  }

  React.useEffect(() => {
    const keysPressed: { [key: string]: boolean } = {}
    document.onkeydown = async (event: KeyboardEvent) => {
      keysPressed[event.key] = true
      if (!(keysPressed['Meta'] && event.key === 'k')) return
      await showModal()
      setTimeout(async () => {
        searchText?.current?.focus()
      }, 100)
    }
    document.onkeyup = (event: KeyboardEvent) => delete keysPressed[event.key]
  }, [])

  return (
    <>
      <button
        onClick={showModal}
        type="button"
        className={tw(
          `flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-600`,
          `dark:text-gray-300`
        )}
      >
        <span className="sr-only">Navigation</span>
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m19 19-3.5-3.5"></path>
          <circle cx="11" cy="11" r="6"></circle>
        </svg>
      </button>
      <Transition appear={open} show={open} as={React.Fragment}>
        <Dialog
          onClose={hideModal}
          onKeyPress={onEnter}
          className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-[1px]"
        >
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
            </Transition.Child>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="fixed w-full max-w-[30rem] text-base font-semibold text-gray-900 bg-white rounded-lg shadow-lg top-[40%]">
                <Dialog.Title
                  as="div"
                  className="flex p-1 justify-evenly px-3 ml-auto space-x-3 text-left text-gray-400 bg-white rounded-lg shadow-sm h-12 md:flex ring-[1px] ring-gray-900/10 hover:ring-gray-300 ring-gray-400"
                >
                  <button onClick={onSearchClick} className="outline-none">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="flex-none text-gray-300"
                      aria-hidden="true"
                    >
                      <path d="m19 19-3.5-3.5"></path>
                      <circle cx="11" cy="11" r="6"></circle>
                    </svg>
                  </button>
                  <input
                    ref={searchText}
                    onKeyPress={onEnter}
                    className="flex-auto w-full text-gray-500 outline-none h-11/12"
                    placeholder="Quick ENS / Address Search"
                  />
                </Dialog.Title>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export const SearchBar = () => {
  const router = useRouter()
  const searchText = React.useRef<HTMLInputElement>(null)

  const onSearchClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      const search = searchText?.current?.value
      if (!search) return
      router.push(`/user?address=${search}`)
    },
    [ searchText ]
  )

  const onEnter = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return
      event.preventDefault()
      const search = searchText?.current?.value

      if (!search) return
      router.push(`/user?address=${search}`)
    },
    [ searchText ]
  )

  return (
    <>
      <button onClick={onSearchClick}>
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex-none text-gray-500"
          aria-hidden="true"
        >
          <path d="m19 19-3.5-3.5"></path>
          <circle cx="11" cy="11" r="6"></circle>
        </svg>
      </button>
      <input
        ref={searchText}
        onKeyPress={onEnter}
        autoComplete="on"
        className={tw(
          `flex-auto w-full font-medium text-gray-700 outline-none h-11/12`,
          `dark:bg-gray-100 dark:active:bg-white`
        )}
        placeholder="Quick ENS / Address Search"
      />
      <kbd className="font-sans font-semibold no-underline flex gap-x-2">
        <span>⌘</span>K
      </kbd>
    </>
  )
}

export default function Header() {
  const { active, error, chainId } = useWeb3React()
  return (
    <div className="sticky top-0 z-40 w-full backdrop-blur-[1px] flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-gray-900/10 supports-backdrop-blur:bg-white/60">
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
                    'mx-auto items-center hidden md:w-[38%] lg:w-[29rem] px-3 ml-auto space-x-3 text-left text-gray-600 bg-white  rounded-lg shadow-sm h-11 md:flex ring-1 ring-gray-900/10 hover:ring-gray-300',
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
              <SearchBarModal />
            </div>

            {/* Navigation Three Dots */}
            <div className="ml-2 -my-1 md:hidden">
              <WalletModal />
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
    </div>
  )
}

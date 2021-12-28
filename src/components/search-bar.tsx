import { isValidEthAddress } from 'src/utils/string-validators'
import { useRouter } from 'next/router'
import * as React from 'react'
import { tw } from 'twind'

// TODO: add ENS support
const verifyAddress = (address: string) => {
  if (isValidEthAddress(address) || address.endsWith('.eth')) return true
  import('react-hot-toast').then(({ toast }) => {
    toast('Invalid Ethereum address', {
      position: 'bottom-right',
      style: {
        background: '#f44336',
        color: '#fff',
      },
    })
  })
}

export const SearchBar = () => {
  const router = useRouter()
  const searchText = React.useRef<HTMLInputElement>(null)

  const onSearchClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      const search = searchText?.current?.value
      if (!search || !verifyAddress(search)) return
      router.push(`/user/${search}`)
    },
    [searchText]
  )

  const onEnter = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return
      event.preventDefault()
      const search = searchText?.current?.value
      if (!search || !verifyAddress(search)) return
      router.push(`/user/${search}`)
    },
    [searchText]
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
          'flex-auto w-full font-medium text-gray-700 outline-none h-11/12',
          'dark:bg-gray-100 dark:active:bg-white'
        )}
        placeholder="Quick ENS / Address Search"
      />
      <kbd className="font-sans font-semibold no-underline flex gap-x-2">
        <span>⌘</span>K
      </kbd>
    </>
  )
}

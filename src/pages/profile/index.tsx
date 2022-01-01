import { useTextileContext } from '@/contexts/textile-context'
import { useEnsImage } from '@/hooks/use-ens-image'
import { useEtherUser } from '@/hooks/use-ether-user'
import { useFollowingList } from '@/hooks/use-following-list'
import type { Following } from '@/textile/textile-store'
import { unfollow } from '@/textile/textile-store'
import { shortenAddress } from '@/wallet/utils'
import type { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import Link from 'next/link'
import * as React from 'react'
import { QueryClient } from 'react-query'
import { tw } from 'twind'

const LoadingTable = ({ fakeRowsCount = 4 }: { fakeRowsCount?: number }) => {
  return (
    <div className="grid flex-grow gap-3 p-6 shadow-xl rounded-xl bg-base-100 w-full rounded-tl-none">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <tbody>
            {Array.from({ length: fakeRowsCount }).map((_, idx) => (
              <tr className={tw(`animate-pulse`)} key={idx}>
                <th>
                  <label
                    className={tw(`
                  bg-gray-700
                `)}
                  >
                    <input
                      type="checkbox"
                      className="checkbox bg-gray-300"
                      disabled
                    />
                  </label>
                </th>

                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="w-10 h-10 mask mask-squircle bg-gray-400"></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold bg-gray-400 w-28  h-2 rounded border"></div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold bg-gray-400 w-56 h-2 rounded border"></div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold bg-gray-400 w-16 h-2 rounded border"></div>
                  </div>
                </td>
                <th>
                  <div className=" bg-gray-400 w-12 h-4 rounded border"></div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const TableRow = ({ address }: { address: string }) => {
  const queryClient = new QueryClient()
  const { library } = useWeb3React()
  const { client } = useTextileContext()
  // @ts-ignore
  const { threadId } = client
  const { ens, url, avatar, balance, ethAddress } = useEtherUser({
    address,
    provider: library,
  })
  const image = useEnsImage(avatar as string)
  const [loading, setLoading] = React.useState(false)

  const unfollowUser = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true)
    event.preventDefault()
    if (!library) return
    const response = await unfollow({
      client,
      threadId,
      address: ethAddress as string,
    })
    // await refetch()
    import('react-hot-toast').then(({ toast }) => {
      toast(
        `Unfollowed ${shortenAddress({
          address: ethAddress as string,
          chars: 8,
        })}`,
        {
          position: 'bottom-right',
          style: {
            background: '#f7f7f7',
            color: '#1c1c1c',
            // fontSize: '1.2rem',
            padding: '0.5rem',
          },
          duration: 3000,
        }
      )
    })
    await queryClient.refetchQueries()
    setLoading(false)
    return response
  }

  return (
    <tr className={tw(``)}>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <Link href={`/user/${address}`}>
          <div className="flex items-center space-x-3 hover:cursor-pointer">
            <div className="avatar">
              <div className="w-12 h-12 mask mask-squircle">
                <img
                  src={image ?? '/assets/images/placeholder.png'}
                  alt="avatar"
                />
              </div>
            </div>
            <div>
              <div className="font-bold hover:cursor-pointer hover:underline">
                {ens ?? 'no ens'}
              </div>
            </div>
          </div>
        </Link>
      </td>
      <td
        className={tw(
          `hover:cursor-pointer hover:underline hover:text-slate-300`
        )}
      >
        <Link href={`/user/${address}`}>
          {shortenAddress({ address, chars: 12 })}
        </Link>
      </td>
      <td>{balance}</td>
      <th>
        <button
          className={tw(`btn btn-ghost btn-xs`, loading && `loading`)}
          onClick={unfollowUser}
          disabled={loading}
        >
          unfollow
        </button>
      </th>
    </tr>
  )
}

export const FollowingTable = ({
  followingList,
}: {
  followingList: Following[]
}) => {
  return (
    <div className="grid flex-grow gap-3 p-6 shadow-xl rounded-xl bg-base-100 w-full rounded-tl-none">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <tbody>
            {followingList &&
              followingList.map(({ address }, index) => {
                return <TableRow key={index} address={address} />
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function Profile() {
  const { account, library } = useWeb3React<Web3Provider>()
  const { ens, url, avatar } = useEtherUser({
    provider: library,
    address: account,
  })

  const [followingList, isLoading, error] = useFollowingList({
    account: account as string,
  })
  console.log('followingList', followingList)

  return (
    <div
      className={tw(
        'flex flex-col gap-y-12 justify-center items-center',
        'dark:text-gray-50'
      )}
    >
      <div
        className={tw(
          `w-40 flex flex-col m-auto justify-center items-center text-center`
        )}
      >
        <div className="w-32 h-32 mask mask-squircle bg-base-content bg-opacity-10">
          <img
            src={avatar ?? '/assets/images/placeholder.png'}
            alt="Avatar"
            className="mask mask-squircle"
          />
        </div>
        <div
          className={tw(
            'group inline-flex items-center h-9 rounded-full text-lg mt-8 whitespace-nowrap p-5 focus:outline-none focus:ring-2 bg-sky-50 text-sky-600 hover:bg-sky-100 hover:text-sky-700 focus:ring-sky-600 hover:cursor-pointer',
            'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500'
          )}
        >
          <a
            className={tw(`hover:underline hover:decoration-dotted`)}
            href="https://ens.domains/#portable-title"
            rel="noopener noreferrer"
            target="_blank"
          >
            Get ENS name
          </a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 overflow-visible ml-3 text-sky-300 group-hover:text-sky-400 dark:text-gray-500 dark:group-hover:text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col m-auto flex-shrink-0 row-span-3 mx-2 xl:mx-0 w-8/12 place-self-start">
        <div className="dropdown">
          <div tabIndex={0}>
            <div className="flex-grow-0 tabs w-full">
              <button className="flex-1 tab tab-lifted tab-lg tab-border-none tab-active">
                Following
              </button>
              <button className="flex-1 tab tab-lifted tab-lg tab-border-none">
                Favorites
              </button>
            </div>
          </div>{' '}
        </div>{' '}
        {(isLoading || !library) && <LoadingTable />}
        {followingList && followingList.length > 0 && (
          <FollowingTable followingList={followingList} />
        )}
      </div>
    </div>
  )
}

import { useTextileContext } from '@/contexts/TextileContext'
import { useEtherUser } from '@/hooks/use-ether-user'
import { getFollowingList } from '@/textile/textileStore'
import type { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import type { NextPage } from 'next'
import Image from 'next/image'
import * as React from 'react'
import { useQuery } from 'react-query'
import { tw } from 'twind'

interface Following {
  address: string
  _id: string
}
// following list custom hook
export const useFollowingList = ({ account }: { account: string }) => {
  const { client } = useTextileContext()
  //@ts-ignore
  const threadId = React.useMemo(() => window.threadId, [client])
  //const client = React.useMemo(() => window.client, [])
  console.log(threadId)

  const { data, isLoading, error } = useQuery(
    ['following', account, threadId],
    async (): Promise<Following[]> => await getFollowingList(client, threadId),
    {
      enabled: !!client && !!threadId && !!account,
      refetchOnReconnect: false,
    }
  )
  console.log(threadId)

  return [data, isLoading, error]
}

const Profile: NextPage = () => {
  const { active, account, library } = useWeb3React<Web3Provider>()
  const { ens, url, avatar } = useEtherUser({
    provider: library,
    address: account,
  })

  const [followingList, isLoading, error] = useFollowingList({
    account: account as string,
  })
  console.log('followingList', followingList)

  return (
    <div className={tw('flex justify-center', 'dark:text-gray-50')}>
      <div className={tw('flex flex-col items-center')}>
        <Image
          src={ens ?? '/assets/images/eth_vital.png'}
          width={200}
          height={200}
        />
        <div className={tw('text-center')}>
          <h1>{ens ?? 'No ENS'}</h1>
          <h2>{url ?? 'No URL'}</h2>
        </div>
        <div className={tw('text-center')}>
          <h1>{avatar ?? 'No Avatar'}</h1>
        </div>
        <div className={tw('text-center')}>
          <h1>{account ?? 'No Account'}</h1>
        </div>
        <div className={tw('flex flex-col items-center')}>
        <div className={tw('text-center')}>
          <h1>You follow {followingList?.length ?? 'No Following'} users</h1>
          {followingList && (
            <>
              <h1>
                You follow {followingList?.length ?? 'No Following'} users
              </h1>

              {followingList.map(
                (
                  item: {
                    address: string
                    _id: string
                  },
                  index: number
                ) => (
                  <div key={index}>{item.address}</div>
                )
              )}
            </>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}
export default Profile

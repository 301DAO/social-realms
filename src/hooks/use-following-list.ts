import { useTextileContext } from '@/contexts/textile-context'
import { getFollowingList } from '@/textile/textile-store'
import * as React from 'react'
import { useQuery } from 'react-query'
export interface Following {
  address: string
}

 type UseFollowingList = readonly [
  data: string[] | undefined,
  isLoading: boolean,
  isError: boolean
]

// following list custom hook
export const useFollowingList = ({ account }: { account: string }) => {
  const { client } = useTextileContext()
  //@ts-ignore
  const threadId = React.useMemo(() => client.threadId, [client])

  const {
    data: followingList,
    isLoading,
    isError,
  } = useQuery(
    ['following', account, threadId],
    async () => await getFollowingList({ client, threadId }),
    {
      enabled: !!client && !!threadId && !!account,
      //refetchOnReconnect: false,
     // refetchOnWindowFocus: false,
      retry: false,
    }
  )

  return [followingList, isLoading, isError] as const
}

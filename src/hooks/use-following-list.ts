import { getFollowingList } from '@/textile/textileStore'
import type { Client } from '@textile/hub'
import * as React from 'react'
import { useQuery } from 'react-query'
export interface Following {
  address: string
}

export type UseFollowingList = readonly [
  data: string[] | undefined,
  isLoading: boolean,
  isError: boolean
]

// following list custom hook
export const useFollowingList = ({
  account,
  client,
}: {
  account: string
  client: Client
}): UseFollowingList => {
  //@ts-ignore
  const threadId = React.useMemo(() => window.threadId, [client])

  const { data: followingList, isLoading, isError } = useQuery(
    ['following', account, threadId],
    async (): Promise<string[]> => await getFollowingList(client, threadId),
    {
      enabled: !!client && !!threadId && !!account,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  )

  return [followingList, isLoading, isError] as const
}

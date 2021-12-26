import { getFollowingList } from '@/textile/textileStore';
import { useTextileContext } from '@/contexts/TextileContext';
import * as React from 'react';
import { useQuery } from 'react-query';

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
  //console.log(threadId)

  const { data, isLoading, error } = useQuery(
    ['following', account, threadId],
    async (): Promise<Following[]> => await getFollowingList(client, threadId),
    {
      enabled: !!client && !!threadId && !!account,
      refetchOnReconnect: false,
    }
  )
  return [data, isLoading, error]
}
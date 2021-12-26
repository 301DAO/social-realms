import { useTextileContext } from '@/contexts/TextileContext'
import { favoriteTransaction } from '@/textile/textileStore'
import * as React from 'react'
import { useQuery } from 'react-query'

export const useFavoriteTransaction = (txHash: string) => {
  const { client } = useTextileContext()
  //@ts-ignore
  const threadId = React.useMemo(() => window.threadId, [client])
  const { data, isLoading, error } = useQuery(
    ['favoriteTransaction', threadId, txHash],
    async (): Promise<'already favorited' | string[]> =>
      await favoriteTransaction(client, threadId, txHash),
    {
      enabled: !!threadId && !!txHash,
      retry: false,
      // cacheTime: 1000 * 60 * 60 * 24, // 1 day
    }
  )
  return [ data, isLoading, error ]
}


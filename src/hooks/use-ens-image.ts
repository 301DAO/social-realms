import { parseEnsAvatar } from 'src/utils/ens-avatar-parser'
import * as React from 'react'
import { useQuery } from 'react-query'

export function useEnsImage(avatar: string) {

  const { contract, tokenId } = React.useMemo(
    () => parseEnsAvatar(avatar),
    [avatar]
  )
  const { data } = useQuery<string | undefined>(
    ['ens-image', contract, tokenId],
    async () => {
      const res = await fetch(
        `/api/nft-details/?contract=${contract}&token_id=${tokenId}`
      )
      if (res.status !== 200) return
      const json = await res.json()
      return await json.image_url
    },
    {
      enabled: !!avatar && !!contract && !!tokenId,
      retry: false
     }
  )
  return data
}
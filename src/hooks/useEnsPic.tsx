import * as React from 'react'

interface IEnsPic {
  contract: string
  tokenId: string
}

export function useEnsPic({ contract, tokenId }: IEnsPic) {
  const [ image, setImage ] = React.useState<string | null | undefined>(null)
  React.useEffect(() => {
    if (!!contract && !!tokenId) {
      let stale = false
      ;(async () => {
        const response = await fetch(
          `/api/nft-details/?contract=${contract}&token_id=${tokenId}`
        )
        const data = await response.json()
        !stale && setImage(data.image_url)
      })()
      return () => {
        stale = true
        setImage(null)
      }
    }
  }, [ contract, tokenId ])
  return image
}

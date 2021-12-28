import { parseEnsAvatar } from 'src/utils/ens-avatar-parser'
import * as React from 'react'
import { useQuery } from 'react-query'

const getImage = async (contract: string, tokenId: string) => {
  const response = await fetch(
    `/api/nft-details/?contract=${contract}&token_id=${tokenId}`
  )
  if (!response.ok) throw new Error('Network response was not ok')
  return response.json()
}
const placeholderImage = `https://external-preview.redd.it/
NADbWsobDS1wOTyi_AcFjYmfKmz6Oxyre1kFSD93Rts.jpg
?auto=webp&s=832a2557421e6f81fb6dfd0110d652941b9de6c6`

interface IProfileImage {
  avatar: string
  isProfilePic: boolean
}

export default function ProfileImage({ avatar, isProfilePic }: IProfileImage) {
  // memoize function
  const { contract, tokenId } = React.useCallback(
    () => parseEnsAvatar(avatar),
    [ avatar ]
  )
  console.log(contract, tokenId);

  const { data, isLoading, isError, } = useQuery(
    [contract, tokenId],
    async () =>
      await fetch(`/api/nft-details/?contract=${contract}&token_id=${tokenId}`)
  )
  const image = data?.image_url
  if (!image) return <Avatar scale={3} src={placeholderImage} />
  if (isProfilePic) return <Avatar src={image} scale={3} />
  return <img src={image} height="150px" width="150px" />
}

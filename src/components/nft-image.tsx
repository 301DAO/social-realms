import { parseEnsAvatar } from '@/util/ens-avatar-parser'
import { Avatar } from '@geist-ui/react'
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

interface INftImageProps {
  avatar: string
  isProfilePic: boolean
}

export default function NftImage({ avatar, isProfilePic }: INftImageProps) {
  const { contract, tokenId } = parseEnsAvatar(avatar)
  const { data } = useQuery(`nftImage-${tokenId}-${contract}`, async () =>
    getImage(contract, tokenId)
  )
  const image = data?.image_url
  if (!image) return <Avatar scale={3} src={placeholderImage} />
  if (isProfilePic) return <Avatar src={image} scale={3} />
  return <img src={image} height="150px" width="150px" />
}

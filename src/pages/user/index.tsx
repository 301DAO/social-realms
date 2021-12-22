import { UserCard } from '@/components/user-card'
import { useTextileContext } from '@/contexts/TextileContext'
import { useEnsPic, useEtherUser } from '@/hooks/index'
import { follow, isFollowing, unfollow } from '@/textile/textileStore'
import { parseEnsAvatar } from '@/util/ens-avatar-parser'
import { Button } from '@geist-ui/react'
import * as Icon from '@geist-ui/react-icons'
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useQuery } from 'react-query'
import { tw } from 'twind'
export default function Profile() {
  const { library } = useWeb3React()
  const { client } = useTextileContext()
  //@ts-ignore
  const { threadId } = client
  const router = useRouter()
  const address = router?.query?.address as string
  const { url, ens, avatar, ethAddress, balance } = useEtherUser({
    provider: library,
    address,
  })
  const { contract, tokenId } = parseEnsAvatar(avatar as string)
  const image = useEnsPic({ contract, tokenId })
  const [ loading, setLoading ] = React.useState(false)

  const { data, isLoading, refetch, error } = useQuery(
    [ 'user', ethAddress, threadId ],
    async (): Promise<Boolean | undefined> =>
      await isFollowing(client, threadId, ethAddress as string),
    {
      enabled: !!client && !!threadId && !!ethAddress,
      //retry: false,
    }
  )

  const isFollowed = data

  const buttonText = isFollowed
    ? 'Unfollow'
    : isLoading
    ? 'Loading...'
    : 'Follow'

  const followUser = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!library) return
    setLoading(true)
    const response = await follow(client, threadId, ethAddress as string)
    await refetch()
    setLoading(false)
    return response
  }

  const unfollowUser = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!library) return
    setLoading(true)
    const response = await unfollow(client, threadId, ethAddress as string)
    await refetch()
    setLoading(false)
    return response
  }

  console.log('isloading', isLoading, 'loading', loading)
  const test = async (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.target)
  }
  return (
    <div className={tw('flex justify-center')}>
      <UserCard
        address={ethAddress as string}
        balance={balance as string}
        img={image as string}
        ens={ens as string}
        url={url as string}
        footerButton={
          isFollowed ? (
            <Button
              icon={<Icon.UserX />}
              type="error"
              ghost
              w="100%"
              h="40px"
              shadow
              loading={isLoading || loading}
              onClick={unfollowUser}
            >
              {buttonText}
            </Button>
          ) : (
            <Button
              icon={<Icon.UserPlus />}
              w="100%"
              h="40px"
              shadow
              loading={isLoading || loading}
              onClick={followUser}
            >
              {buttonText}
            </Button>
          )
        }
      />
    </div>
  )
}
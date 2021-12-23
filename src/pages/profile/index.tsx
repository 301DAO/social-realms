import { FollowCard } from '@/components/FollowCard'
import NftImage from '@/components/nft-image'
import { useTextileContext } from '@/contexts/TextileContext'
import { useEtherUser } from '@/hooks/useEtherUser'
import { getFollowingList } from '@/textile/textileStore'
import { Link, Note, Text } from '@geist-ui/react'
import { useWeb3React } from '@web3-react/core'
import type { NextPage } from 'next'
import * as React from 'react'
import { useQuery } from 'react-query'
import { tw } from 'twind'
const Profile: NextPage = () => {
  const { active, account, library } = useWeb3React()
  const { client } = useTextileContext()

  //@ts-ignore
  const { threadId } = client
  const { ens, url, avatar } = useEtherUser({
    provider: library,
    address: account,
  })
  const { data, isLoading, error } = useQuery(
    ['following', client, threadId ],
    async () => await getFollowingList(client, threadId),
    {
      enabled: !!client && !!threadId && !!account,
    }
  )
  const following = data
  // console.log(data, isLoading, error)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {ens ? (
        <>
          <Text h1>{`Hi, ${ens}`}</Text>
          <NftImage avatar={avatar as string} isProfilePic />
        </>
      ) : (
        <Note>
          <Text h4>
            You don&apos;t seem to have a primary ENS domain to serve as your
            web3 profile. Learn more{' '}
            <Link color href="https://ens.domains/" target="_blank">
              here.
            </Link>
          </Text>
        </Note>
      )}

      <br />
      <p className={tw(`dark:text-gray-100`)}>Following</p>

      <br />
      {following &&
        following?.map((item: any) => {
          return (
            <FollowCard
              key={item._id}
              address={item.address}
              provider={library}
            />
          )
        })}
        {!following && (
          <div>
            <p>You don't appear to be following anyone</p>
          </div>
        )}
    </div>
  )
}
export default Profile
import { useTextileContext } from '@/contexts/TextileContext'
import { useEnsImage, useEtherUser } from '@/hooks/index'
import { follow, isFollowing, unfollow } from '@/textile/textileStore'
import { useWeb3React } from '@web3-react/core'
import { getDefaultProvider } from 'ethers'
import type { GetServerSideProps, GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'
import * as React from 'react'
import { useQuery } from 'react-query'
import { tw } from 'twind'
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

type Params = {
  params: {
    address: string
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const { address } = context.params!
  const provider = getDefaultProvider('homestead', {
    etherscan: 'GQSKCRQW58UP42Q144XF9KT1ITWF2EIPZU',
  })
  if ((address as string).endsWith('.eth')) {
    const ethAddress = await provider.resolveName(address as string)
    const ens = address
    console.log(ethAddress)
    console.log(ens)
    return {
      props: {
        address: ethAddress,
        ens,
      },
    }
  }
  const ens = await provider.lookupAddress(address as string)
  return {
    props: {
      address,
      ens,
    },
  }
}

// export const getServerSideProps: GetServerSideProps = async context => {
//   const { address } = context.params!
//   const provider = getDefaultProvider('homestead', {
//     etherscan: 'GQSKCRQW58UP42Q144XF9KT1ITWF2EIPZU',
//   })
//   if ((address as string).endsWith('.eth')) {
//     const ethAddress = await provider.resolveName(address as string)
//     const ens = address
//     console.log(ethAddress)
//     console.log(ens)
//     return {
//       props: {
//         address: ethAddress,
//         ens,
//       },
//     }
//   }
//   const ens = await provider.lookupAddress(address as string)
//   return {
//     props: {
//       address,
//       ens,
//     },
//   }
// }

export default function User({ address }: { address: string }) {
  console.log(address)

  const { library } = useWeb3React()
  const { client } = useTextileContext()
  //@ts-ignore
  const { threadId } = client
  const { url, ens, avatar, ethAddress, balance } = useEtherUser({
    provider: library,
    address,
  })

  console.log(avatar)

  const ensImage = useEnsImage(avatar as string)
  const { data, isLoading, refetch, error } = useQuery(
    ['user', ethAddress, threadId],
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
    const response = await follow(client, threadId, ethAddress as string)
    await refetch()
    return response
  }

  const unfollowUser = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!library) return
    const response = await unfollow(client, threadId, ethAddress as string)
    await refetch()
    return response
  }
  return (
    <div className={tw('flex justify-center')}>
      <Image
        src={ensImage ?? '/assets/images/eth_vital.png'}
        width={200}
        height={200}
        className={tw('rounded-full')}
        alt="avatar"
      />
      <ul
        className={tw(
          'flex flex-col justify-center items-center w-full h-full',
          'dark:bg-gray-900'
        )}
      >
        <li className={tw('text-center')}>
          <h1 className={tw('text-2xl')}>{ens}</h1>
        </li>
        <li className={tw('text-center')}>
          <h1 className={tw('text-2xl')}>{ethAddress}</h1>
        </li>
        <li className={tw('text-center')}>
          <h1 className={tw('text-2xl')}>{balance}</h1>
        </li>
        <li className={tw('text-center')}>
          <button
            className={tw(
              'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            )}
            onClick={isFollowed ? unfollowUser : followUser}
            disabled={isLoading}
          >
            {buttonText}
          </button>
        </li>
      </ul>
    </div>
  )
}

//const { ethAddress, ens, balance, image, followed } = user
import { useTextileContext } from '@/contexts/TextileContext'
import { useEnsImage } from '@/hooks/use-ens-image'
import { useEtherUser } from '@/hooks/use-ether-user'
import { follow, isFollowing, unfollow } from '@/textile/textileStore'
import { shortenAddress } from '@/wallet/utils'
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useQuery } from 'react-query'
import { tw } from 'twind'

// export const getStaticPaths: GetStaticPaths = async () => {
//   return { paths: [], fallback: 'blocking' }
// }

// type Params = {
//   params: {
//     address: string
//   }
// }

// export const getStaticProps: GetStaticProps = async context => {
//   const { address } = context.params!
//   const provider = getDefaultProvider()
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

const user = {
  ethAddress: '0x983110309620D911731Ac0932219af06091b6744',
  ens: 'brantly.eth',
  balance: '0.62',
  image: 'https://api.wrappedpunks.com/images/punks/2430.png',
  followed: true,
  loading: false,
  followUser: () => {},
  unfollowUser: () => {},
  buttonText: 'follow'
}

const { ethAddress, ens, balance, image, followed, loading, followUser, unfollowUser, buttonText} = user

//export default function User({ address }: { address: string }) {
export default function User() {
  const router = useRouter()
  const {
    query: { address },
  } = router

  const [loading, setLoading] = React.useState(false)

  const { library } = useWeb3React()
  const { client } = useTextileContext()
  //@ts-ignore
  const { threadId } = client
  const { url, ens, avatar, ethAddress, balance } = useEtherUser({
    provider: library,
    // @ts-ignore
    address,
  })

  const image = useEnsImage(avatar as string)

  const { data, isLoading, refetch, error } = useQuery(
    ['user', ethAddress, threadId],
    async (): Promise<Boolean | undefined> =>
      await isFollowing(client, threadId, ethAddress as string),
    {
      enabled: !!client && !!threadId && !!ethAddress,
      //retry: false,
    }
  )
  console.log(isLoading);

  const followed = data
  const buttonText = followed ? 'Unfollow' : isLoading ? 'Loading...' : 'Follow'

  const followUser = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true)
    event.preventDefault()
    if (!library) return
    const response = await follow(client, threadId, ethAddress as string)
    await refetch()
    setLoading(false)
    return response
  }

  const unfollowUser = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true)
    event.preventDefault()
    if (!library) return
    const response = await unfollow(client, threadId, ethAddress as string)
    await refetch()
    setLoading(false)
    return response
  }

  return (
    <div
      className={tw(
        `items-center w-full px-4 md:mt-1 card sm:card-side flex justify-center sm:gap-x-20`,
        !ethAddress && `animate-pulse`
      )}
      data-theme="dark"
    >
      <div className="mb-6 card card-bordered bg-[#292a37] text-neutral-content">
        <div className="py-6 px-3 self-center sm:w-96">
          <img
            src={image ?? '/assets/images/pulse-placeholder.png'}
            className={tw(
              `rounded-lg shadow-lg`,
              !image && 'animate-pulse blur-sm'
            )}
          />
        </div>
        <div className="max-w-lg md:w-[400px] card-body pt-0 md:justify-between md:self-center">
          <div>
            <h2 className={tw(`card-title flex justify-between`)}>
              <span className={tw(`link no-underline hover:underline`)}>
                {ens ?? ''}
              </span>
              <span className={tw(`me-auto`)}>{balance ?? ''}</span>
            </h2>
            <button className={tw(`btn btn-ghost pl-0`)}>
              {ethAddress && shortenAddress(ethAddress)}
            </button>
          </div>
          <div className="card-actions">
            <button
              className={tw(
                `btn btn-block btn-primary hover:btn-ghost rounded-sm`,
                loading && `loading`
              )}
              onClick={followed ? unfollowUser : followUser}
              disabled={loading}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
      <div className={tw('space-y-8')}>
        <div className="card lg:card-side card-bordered align-top">
          <div className="card-body">
            <h2 className="card-title">No Images</h2>
            <p>
              Rerum reiciendis beatae tenetur excepturi aut pariatur est eos.
              Sit
            </p>
            <div className="card-actions">
              <button className="btn btn-primary">Get Started</button>
              <button className="btn btn-ghost">More info</button>
            </div>
          </div>
        </div>
        <div className="card lg:card-side card-bordered align-top">
          <div className="card-body">
            <h2 className="card-title">No Images</h2>
            <p>
              Rerum reiciendis beatae tenetur excepturi aut pariatur est eos.
              Sit
            </p>
            <div className="card-actions">
              <button className="btn btn-primary">Get Started</button>
              <button className="btn btn-ghost">More info</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

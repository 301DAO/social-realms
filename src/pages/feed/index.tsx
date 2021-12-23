import { useTextileContext } from '@/contexts/TextileContext'
import { getTxsForAddress } from '@/lib/covalent-api-wrapper'
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useQuery } from 'react-query'
import { tw } from 'twind'
export const FAKE_FEED = [
  {
    address: '0x983110309620D911731Ac0932219af06091b6744',
    ens: 'brantly.eth',
    balance: '2.46',
    url: 'http://brantly.xyz/',
    avatar: 'eip155:1/erc721:0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6/2430',
    img: 'https://api.wrappedpunks.com/images/punks/2430.png',
    text: 'Swapped 25 ETH for 420.69 USDC on PussySwap v69 💸',
    details: '',
  },
  {
    address: '0x648aA14e4424e0825A5cE739C8C68610e143FB79',
    ens: 'sassal.eth',
    balance: '69.46',
    url: 'http://jondoe.pizza/',
    avatar: 'eip155:1/erc721:0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6/6571',
    img: 'https://lh3.googleusercontent.com/-w3k-j9DHgkrIJ10IJ7aNmRSawLKJW3JLtLjTH9jHyxEmgBb30KFj82YX59kQImzDZy1yiu5Gv7YyAJwfTtSKcToffSM3-OcdILkNg=w600',
    text: 'Minted a new ERC-721 token: CryptoPunk[6969] 🎨',
    detail: '',
  },
  {
    address: '0x648aA14e4424e0825A5cE739C8C686123985271',
    ens: 'krypto.eth',
    balance: '0.87',
    url: 'http://jondoe.pizza/',
    avatar: 'eip155:1/erc721:0xb7F7F6C52F2e2fdb1963Eab30438024864c313F6/6571',
    img: 'https://lh3.googleusercontent.com/YinTK0CUDPGnoE-7RPOuSlDSO8-3WyNrpkzcOXPtKRl36yuhMGoJjLfzrCyx15bh8gCYZf33SxALC_FxxnW-tNJpUIubv4CUeAcnLDQ=s0',
    text: 'Withdrew 75% of LINK-USDT liquidity pool 🐻 📉',
    detail: '',
  },
]
export default function Feed() {
  const { active, library, account } = useWeb3React()
  const { client } = useTextileContext()
  //@ts-ignore
  const { threadId } = client
  const router = useRouter()
  const { data, isLoading, error, isError, refetch } = useQuery(
    ['feed', client, threadId],
    async () => await getTxsForAddress(account as string),
    // await fetch(
    //   `/api/address-txs/?address=0xb412DB7A26943cD260bAE812faAB53D225b3ccdD`
    // )
    {
      enabled: !!library,
      //refetchInterval: 1000 * 60 * 5,
    }
  )
  const txs = data?.data?.items

  return (
    <div className={tw(`flex text-gray-100 md-auto justify-center`)}>
     <p className={tw(`text-6xl font-extrabold`)}>Work in progress</p>
      {/* {!library ? (
        <h1>Loading...</h1>
      ) : (
        <div className={tw(`flex flex-col justify-center w-[350px]`)}>
          {txs?.map((item: any) => {
            return (
              <pre key={item?.tx_hash} className={tw('w-16 word-break')}>
                {JSON.stringify(item?.log_events[0], null, 3)}
              </pre>
            )
          })}
        </div>
      )} */}
    </div>
  )
}

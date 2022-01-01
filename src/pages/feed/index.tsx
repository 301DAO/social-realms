// import Link from 'next/link'
import { LoadingTransaction } from '@/components/loading-transaction'
import { useTextileContext } from '@/contexts/textile-context'
import { useFollowingList } from '@/hooks/use-following-list'
import { getTransactionsForAddress } from '@/lib/covalent-api-wrapper'
import type { feedTransaction } from '@/utils/transactions-filters'
import { filterTransactions } from '@/utils/transactions-filters'
import { useWeb3React } from '@web3-react/core'
import { getDefaultProvider } from 'ethers'
import type { GetStaticProps } from 'next'
import * as React from 'react'
import { useQueries } from 'react-query'
import { tw } from 'twind'
import { useHasMounted } from '@/hooks/use-has-mounted'
// export const getStaticPaths: GetStaticPaths = async () => {
//   return { paths: [], fallback: 'blocking' }
// }

// type Params = {
//   params: {
//     address: string
//   }
// }

const _transactions = [
  {
    timestamp: '2021-12-31 06:15:43',
    block: 13913082,
    hash: '0x62d19e1a2d4f9be16c0f532aa1851a4bae74916013c13b836f195a39a00c7ee9',
    successful: true,
    project: 'Gas DAO',
    token: 'GAS',
    type: 'Claim',
    params: [
      {
        name: 'acount',
        type: 'address',
        indexed: true,
        decoded: true,
        value: '0x9fb7e6090096c3a0a6b085c8e33d99e5610234fa',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        decoded: true,
        value: '215843041572815855033696',
      },
    ],
  },
  {
    timestamp: '2021-12-28 09:16:59',
    block: 13894483,
    hash: '0x21cd13a7fa55dffbff54f59746f1cb69f6a24b87c35406c765298e5fcca65f75',
    successful: true,
    project: 'Wrapped UST Token',
    token: 'UST',
    type: 'Approval',
    params: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        decoded: true,
        value: '0x9fb7e6090096c3a0a6b085c8e33d99e5610234fa',
      },
      {
        name: 'spender',
        type: 'address',
        indexed: true,
        decoded: true,
        value: '0x6b44d94ecdfaf0cb00def55212e226603bb68793',
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
        decoded: true,
        value:
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      },
    ],
  },
  {
    timestamp: '2021-12-28 09:16:20',
    block: 13894480,
    hash: '0x182158e0203fe30b7050592959f09e6e63c4bafd48a2fd8385312c30762c09c6',
    successful: true,
    project: 'Wrapped UST Token',
    token: 'UST',
    type: 'Approval',
    params: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        decoded: true,
        value: '0x9fb7e6090096c3a0a6b085c8e33d99e5610234fa',
      },
      {
        name: 'spender',
        type: 'address',
        indexed: true,
        decoded: true,
        value: '0xd96f48665a1410c0cd669a88898eca36b9fc2cce',
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
        decoded: true,
        value:
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      },
    ],
  },
  {
    timestamp: '2021-12-26 05:44:37',
    block: 13880598,
    hash: '0x886c464755828ff14405e77c089f70e5c598411294e342f4f4141260d067a024',
    successful: true,
    project: 'Wrapped UST Token',
    token: 'UST',
    type: 'Approval',
    params: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        decoded: true,
        value: '0x9fb7e6090096c3a0a6b085c8e33d99e5610234fa',
      },
      {
        name: 'spender',
        type: 'address',
        indexed: true,
        decoded: true,
        value: '0x1111111254fb6c44bac0bed2854e76f90643097d',
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
        decoded: true,
        value:
          '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      },
    ],
  },
  {
    timestamp: '2021-12-26 01:01:09',
    block: 13879330,
    hash: '0x97f52c467ca52acc0f25355b3405b6b185cb138d0eba96647042da05df239ba5',
    successful: true,
    project: 'USD Coin',
    token: 'USDC',
    type: 'Transfer',
    params: [
      {
        name: 'from',
        type: 'address',
        indexed: true,
        decoded: true,
        value: '0x842d60d060cef12c2a97706c2794b4ca96353d66',
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        decoded: true,
        value: '0x1111111254fb6c44bac0bed2854e76f90643097d',
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
        decoded: true,
        value: '11422891502',
      },
    ],
  },
  {
    timestamp: '2021-12-25 11:34:07',
    block: 13875748,
    hash: '0xbd81a4c47c5929eb21b2b0a0a6b738ffcf90d9ac5e931fa2bbaab6ff6ba91cc6',
    successful: true,
    project: 'SOS',
    token: 'SOS',
    type: 'Transfer',
    params: [
      {
        name: 'from',
        type: 'address',
        indexed: true,
        decoded: true,
        value: '0x0000000000000000000000000000000000000000',
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        decoded: true,
        value: '0x9fb7e6090096c3a0a6b085c8e33d99e5610234fa',
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
        decoded: true,
        value: '4334123023200000000000000',
      },
    ],
  },
  {
    timestamp: '2021-12-23 23:28:58',
    block: 13866007,
    hash: '0xe6680f9cf0532ba0918252a63f161cb5d5c13ed6c067f06473cac14471d1ca63',
    successful: true,
    project: 'Spell Token',
    token: 'SPELL',
    type: 'Transfer',
    params: [
      {
        name: 'from',
        type: 'address',
        indexed: true,
        decoded: true,
        value: '0x842d60d060cef12c2a97706c2794b4ca96353d66',
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        decoded: true,
        value: '0x9fb7e6090096c3a0a6b085c8e33d99e5610234fa',
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
        decoded: true,
        value: '523135712595507788979066',
      },
    ],
  },
  {
    timestamp: '2021-12-22 01:31:08',
    block: 13853636,
    hash: '0x04f9ef6f8eaa9cd4928acb4ed236de921b47ba6ac7ba76cd7f3bd2c32a5c2cd5',
    successful: true,
    project: 'Wrapped UST Token',
    token: 'UST',
    type: 'Transfer',
    params: [
      {
        name: 'from',
        type: 'address',
        indexed: true,
        decoded: true,
        value: '0x0000000000000000000000000000000000000000',
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        decoded: true,
        value: '0x9fb7e6090096c3a0a6b085c8e33d99e5610234fa',
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
        decoded: true,
        value: '5644350000000000000000',
      },
    ],
  },
  {
    timestamp: '2021-12-21 09:51:35',
    block: 13849425,
    hash: '0xa431e8583b862363f6934b6ac6b0f20569fcd86e822a353209934c5493a5cbd1',
    successful: true,
    project: 'USD Coin',
    token: 'USDC',
    type: 'Transfer',
    params: [
      {
        name: 'from',
        type: 'address',
        indexed: true,
        decoded: true,
        value: '0x9fb7e6090096c3a0a6b085c8e33d99e5610234fa',
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        decoded: true,
        value: '0x1c6f67b05ec79ac9de3d35cedf890e02c4639109',
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
        decoded: true,
        value: '18000000000',
      },
    ],
  },
]

export const getStaticProps: GetStaticProps = async context => {
  const provider = getDefaultProvider()

  return {
    props: {},
  }
}

export default function Feed() {
  const { active, library, account } = useWeb3React()
  const { client } = useTextileContext()
  // @ts-ignore
  //const { threadId } = client
  const hasMounted = useHasMounted()

  const [followingList, isLoading, isError] = useFollowingList({
    account: account as string,
  })

  const memoizedFollowingList = React.useMemo(
    () => followingList?.map(_ => _.address),
    [followingList]
  )

  const transactionsQueries = useQueries(
    (memoizedFollowingList || []).map((address, idx) => {
      return {
        queryKey: ['txs', address, idx],
        queryFn: async () => {
          const response = await getTransactionsForAddress({
            address,
            limit: 10,
          })
          if (!response.error) {
            const transactions = response?.data?.items
            return filterTransactions(transactions)
          }
        },
        config: {
          enabled: !!followingList,
          retry: false,
          refetchInterval: 50000000,
          refetchOnWindowFocus: false,
          retryDelay: 500000000,
          staleTime: 50000000,
        },
      }
    })
  )
  //const transactionsQueriesResponse = transactionsQueries || []
  const transactions = React.useMemo(
    () =>
      transactionsQueries
        .map(({ data }) => data || [])
        .flat()
        .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)),
    [transactionsQueries]
  )

  console.log(transactions)

  // show 5 fake loading cards while waiting for data
  if (
    !hasMounted ||
    isLoading ||
    !active ||
    !library ||
    !client ||
    !followingList ||
    !transactions ||
    transactions.length === 0 ||
    transactions[0] === undefined
  )
    return Array(4)
      .fill(0)
      .map((_, idx) => <LoadingTransaction key={idx} />)

  return (
    <>
      {transactions?.map((tx: feedTransaction, idx: number) => {
        return (
          <div className={tw('sm:mt-0 sm:py-12 mx-32')} key={idx}>
            <div className="card lg:card-side card-bordered">
              <div className="card-body">
                <h2 className="card-title">{tx.token}</h2>
                <p>{tx.project}</p>
                <p>{tx.successful}</p>
                <p>{tx.block}</p>
                <p>{tx.hash}</p>
                <pre>{JSON.stringify(tx.params, null, 2)}</pre>
                <div className="card-actions">
                  <button className="btn btn-primary">{tx.type}</button>
                  <button className="btn btn-ghost">{tx.timestamp}</button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

// import Link from 'next/link'
import { useTextileContext } from '@/contexts/TextileContext'
import { useFollowingList } from '@/hooks/use-following-list'
import { getTxsForAddress } from '@/lib/covalent-api-wrapper'
import { useWeb3React } from '@web3-react/core'
import { getDefaultProvider } from 'ethers'
import type { GetStaticProps } from 'next'
import * as React from 'react'
import { useQueries } from 'react-query'
import { filterTransactions } from 'src/utils/transactions-filters'
import { tw } from 'twind'

export const LoadingTransaction = () => (
  <div className={tw('sm:mt-0 sm:py-12 mx-32')}>
    <div className="border border-blue-300 shadow rounded-md p-4 mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-gray-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-gray-700 rounded col-span-2"></div>
              <div className="h-2 bg-gray-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// export const getStaticPaths: GetStaticPaths = async () => {
//   return { paths: [], fallback: 'blocking' }
// }

// type Params = {
//   params: {
//     address: string
//   }
// }

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
  const { threadId } = client
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
    return () => {
      setHasMounted(false)
    }
  }, [])

  const [followingList, isLoading, isError] = useFollowingList({
    client,
    account,
  })

  const transactionsQueries = useQueries(
    (followingList || []).map((address, idx) => {
      return {
        queryKey: ['txs', address, idx],
        queryFn: async () => await getTxsForAddress(address),
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
  const transactionsQueriesResponse =
    transactionsQueries[0]?.data?.data?.items || []
  const transactions = React.useMemo(
    () => filterTransactions(transactionsQueriesResponse),
    [transactionsQueriesResponse]
  )
  if (
    !hasMounted ||
    isLoading ||
    !active ||
    !library ||
    !client ||
    !followingList ||
    !transactions ||
    transactions.length === 0
  )
    return [3].map((_, idx) => <LoadingTransaction key={idx} />)
  return (
    <>
      {transactions?.map((tx: any, idx: number) => {
        return (
          <div className={tw('sm:mt-0 sm:py-12 mx-32')} key={idx}>
            <div className="card lg:card-side card-bordered">
              <div className="card-body">
                <h2 className="card-title">{tx.token}</h2>
                <p>TODO</p>
                <div className="card-actions">
                  <button className="btn btn-primary">TODO</button>
                  <button className="btn btn-ghost">TODO</button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

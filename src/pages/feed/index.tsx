import { useTextileContext } from '@/contexts/TextileContext'
import { getTxsForAddress } from '@/lib/covalent-api-wrapper'
import * as Icon from '@heroicons/react/outline'
import { useWeb3React } from '@web3-react/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useQueryClient, useQuery } from 'react-query'
import { tw } from 'twind'
// TODO
export default function Feed() {

  const { active, library, account } = useWeb3React()
  const { client } = useTextileContext()
  //@ts-ignore
  const { threadId } = client
  const router = useRouter()
  const { data, isLoading, error, isError, refetch } = useQuery(
    ['feed', client, threadId],
    async () => await getTxsForAddress(account as string),
    {
      enabled: !!library,
      //refetchInterval: 1000 * 60 * 5,
    }
  )
  const txs = data?.data?.items
  return (
    <div className="sm:mt-0 sm:py-12 mx-6">
      <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-700 h-10 w-10">
            <img src="https://static.wixstatic.com/media/95db9b_c05be7ec3cac4b8f9cbce2750b42a3de~mv2.png/v1/fill/w_360,h_360,al_c,q_95/95db9b_c05be7ec3cac4b8f9cbce2750b42a3de~mv2.webp" />
          </div>
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

      {/** card to show ethereum transaction */}

    </div>
    //{/* {!library ? (
    //   <h1>Loading...</h1>
    // ) : (
    //   <div className={tw(`flex flex-col justify-center w-[350px]`)}>
    //     {txs?.map((item: any) => {
    //       return (
    //         <pre key={item?.tx_hash} className={tw('w-16 word-break')}>
    //           {JSON.stringify(item?.log_events[0], null, 3)}
    //         </pre>
    //       )
    //     })}
    //   </div>
    // )} */}
  )
}

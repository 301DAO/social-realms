import * as React from 'react';
import type { NextPage } from 'next';
import type {
  TransactionResponse,
  WebSocketProvider,
  AlchemyWebSocketProvider,
  InfuraWebSocketProvider,
} from '@ethersproject/providers';
import { useToken, useWebSocketProvider } from 'wagmi';
import { useMutation, useQuery } from 'react-query';

import { gweify, valueExists } from '@/utils';
import { favorite } from '@/lib/mutations';
import { queryClient } from '@/lib/clients';
import { LoadingTransaction } from '@/components';
import { getTransactionsForAddress } from '@/lib/wrappers';
import { DownArrow, RedHeart, TransparentHeart } from '@/components/icons';
import { useIsMounted, useFollowings, useFavorites, useUser } from '@/hooks';

type Provider = WebSocketProvider | AlchemyWebSocketProvider | InfuraWebSocketProvider;
/**
 * this will get past transactions for followed addresses
 * to help populate the feed on load
 */
const getPastTransactions = async (addresses: string[]) => {
  const responses = await Promise.all(
    addresses.map(async address => {
      const transactions = await getTransactionsForAddress({
        address,
        limit: 3,
      });
      return transactions;
    })
  );
  const successResponses = responses.filter(response => response.error === false);
  const allTransactionsMerged = successResponses.reduce((acc, curr) => {
    return [...acc, ...curr.data.items];
  }, []);
  const filter = (tx: any) => {
    return {
      from: tx.from_address,
      to: tx.to_address,
      effectiveGasPrice: tx.gas_quote,
      transactionHash: tx.tx_hash,
      status: tx.successful,
      blockNumber: tx.block_height,
    };
  };
  return allTransactionsMerged.map(filter);
};

/**
 * this will get live transactions for followed addresses using websocket
 */
const getLiveTransactions = async (provider: Provider, addresses: string[]) => {
  const { transactions } = await provider.getBlockWithTransactions('latest');
  const filter = (x: TransactionResponse) => addresses.includes(x.from) || addresses.includes(x.to);
  return transactions.filter(filter);
};

const Feed: NextPage = () => {
  // const [{ data }, getToken] = useToken({
  //   address: '0x54c375c481f95ba43e2cecd6ef30631f55518f57',
  // });
  // console.log(JSON.stringify(data, null, 2));
  const isMounted = useIsMounted();

  const { user } = useUser({ redirectTo: '/login' });
  const address = user?.publicAddress;

  const provider = useWebSocketProvider(); // wagmiProvider();

  const [favorites] = useFavorites({ address: address as string });
  const [followings] = useFollowings({ address: address as string });

  const favoriteMutation = useMutation(
    ({ address, hash }: { address: string; hash: string }) => favorite({ address, hash }),
    {
      onSuccess: () => queryClient.invalidateQueries(['favorites', address]),
    }
  );

  const { data: pastTransactions } = useQuery(
    ['pastTransactions', address],
    async () => await getPastTransactions(followings),
    {
      enabled: !!address,
      //refetchOnWindowFocus: false,
      //refetchInterval: 1000 * 60 * 5,
    }
  );

  const { data: transactions } = useQuery(
    ['feed', address],
    async () => getLiveTransactions(provider!, followings),
    {
      enabled: !!address, //&& valueExists(provider),
      retry: false,
      initialData: [],
      onSettled: data => console.log(`data ${data}, length: ${data?.length}`),
    }
  );

  // show 5 fake loading cards while waiting for data
  if (!isMounted) {
    return (
      <>
        {Array(4)
          .fill(0)
          .map((_, idx) => (
            <LoadingTransaction key={idx} />
          ))}
      </>
    );
  }

  let readyTransactions = transactions?.length ? transactions : pastTransactions;

  return (
    <main className="flex flex-col items-center w-full mx-auto mt-12 text-white align-top justify-items-start gap-y-8">
      {readyTransactions &&
        readyTransactions.length > 0 &&
        readyTransactions.map((transaction: TransactionResponse, idx: any) => (
          <section
            key={idx}
            className="max-w-xl p-4 text-center bg-white border border-gray-200 rounded-xl dark:border-gray-800 dark:bg-gray-800">
            <a
              className="block mt-3 text-xl leading-snug text-black hover:underline dark:text-white"
              href={`/user/${transaction.from}`}>
              {transaction.from}
            </a>
            <DownArrow />
            <a
              className="block my-2 text-xl leading-snug text-black hover:underline dark:text-white"
              href={`/user/${transaction.from}`}>
              {transaction.to}
            </a>
            <div className="my-4 border border-b-0 border-gray-200 dark:border-gray-600"></div>

            <div className="flex justify-between mt-3 text-gray-500 gap-x-4 dark:text-gray-400">
              <div className="flex items-center">
                <button
                  onClick={() =>
                    favoriteMutation.mutate({
                      address: address as string,
                      hash: transaction.transactionHash,
                    })
                  }>
                  {favorites.includes(transaction.transactionHash) ? (
                    <RedHeart />
                  ) : (
                    <TransparentHeart />
                  )}
                </button>
              </div>
              {/* <div className="flex items-center">
                <span className="rounded bg-gray-100 px-1 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  🧱&nbsp;&nbsp;{transaction.blockNumber}
                </span>
              </div> */}
              <div className="flex items-center">
                <span className="rounded bg-gray-100 px-1 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  🧱&nbsp;&nbsp;{transaction.blockNumber}
                </span>
              </div>
              <div className="flex flex-row items-center">
                <span className="rounded bg-gray-100 px-1 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  ⛽️&nbsp;&nbsp;
                  {`${transaction.effectiveGasPrice}`.includes('.')
                    ? transaction.effectiveGasPrice.toFixed(2)
                    : gweify(transaction.effectiveGasPrice)}
                </span>
              </div>
              <div className="flex flex-row items-center">
                {transaction.status ? (
                  <span className="mr-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-200 dark:text-green-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                ) : (
                  <span className="mr-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-200 dark:text-red-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                )}
              </div>
              <a
                className="flex w-[18%] items-center"
                href={`https://etherscan.io/tx/${transaction.transactionHash}`}
                rel="noopener noreferrer"
                target="_blank">
                <span className="truncate rounded bg-blue-100 px-1.5 py-0.5 text-xs font-semibold text-blue-900 hover:cursor-pointer hover:bg-blue-200 hover:text-blue-400 hover:underline dark:bg-blue-200 dark:text-blue-900 dark:hover:bg-blue-300">
                  {transaction.transactionHash}
                </span>
              </a>
            </div>
          </section>
        ))}
    </main>
  );
};
export default Feed;

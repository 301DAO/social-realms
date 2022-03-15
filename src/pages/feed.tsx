import * as React from 'react';
import { useMutation, useQuery } from 'react-query';

import { TIME } from '@/constants';
import { valueExists } from '@/utils';
import { favorite } from '@/lib/mutations';
import { queryClient } from '@/lib/clients';
import { LoadingTransaction } from '@/components';
import { alchemyGetAssetTransfers } from '@/lib/wrappers';
import { DownArrow, RedHeart, TransparentHeart } from '@/components/icons';
import { useIsMounted, useFollowings, useFavorites, useUser } from '@/hooks';
import type { AlchemyGetAssetTransfersResponse } from '@/lib/wrappers/alchemy.types';
import { Transfer } from '@/lib/wrappers/alchemy.types';

type FullfilledResult = PromiseFulfilledResult<AlchemyGetAssetTransfersResponse>[];
async function getAssetTransfers(address: string) {
  const transfersTo = await alchemyGetAssetTransfers({ toAddress: address });
  const transfersFrom = await alchemyGetAssetTransfers({ fromAddress: address });
  const promise = await Promise.allSettled([transfersTo, transfersFrom]);
  const fulfilled = promise.filter(({ status }) => status === 'fulfilled') as FullfilledResult;
  return fulfilled.map(({ value }) => value.result?.transfers ?? []).flat();
}

const Feed = () => {
  const isMounted = useIsMounted();

  const { user } = useUser({ redirectTo: '/login' });
  const address = user?.publicAddress as string;

  const [favorites] = useFavorites({ address });
  const [followings] = useFollowings({ address });

  const favoriteMutation = useMutation(
    ({ address, hash }: { address: string; hash: string }) => favorite({ address, hash }),
    {
      onSuccess: () => queryClient.invalidateQueries(['favorites', address]),
    }
  );

  const {
    data: transactions,
    isLoading,
    isError,
  } = useQuery(
    ['transfers', address],
    async () => {
      const promise = await Promise.allSettled(
        followings.map(async following => await getAssetTransfers(following))
      );
      const fullfilled = promise.filter(
        result => result.status === 'fulfilled' && result.value
      ) as PromiseFulfilledResult<any>[];
      console.log(fullfilled);
      return fullfilled.map(({ value }) => value).flat();
    },
    {
      enabled: !!address && !!followings && isMounted,
      refetchInterval: TIME.MINUTE * 3,
      //refetchOnWindowFocus: false,
    }
  );

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

  let readyTransactions = transactions; //?? [];

  return (
    <main className="mx-auto mt-6 flex w-full flex-col items-center justify-items-start gap-y-4 align-top text-white md:mt-12">
      {readyTransactions &&
        readyTransactions.length > 0 &&
        readyTransactions.map((transaction: Transfer, idx: number) => {
          return (
            <section
              key={idx}
              className="w-full max-w-xl rounded-xl border border-gray-200 bg-white p-4 text-center dark:border-gray-800 dark:bg-gray-800">
              <a
                className="block truncate text-xl leading-snug text-black hover:underline dark:text-white"
                href={`/user/${transaction.from}`}>
                {transaction.from}
              </a>
              <DownArrow />
              <a
                className="my-2 block truncate text-xl leading-snug text-black hover:underline dark:text-white"
                href={`/user/${transaction.from}`}>
                {transaction.to}
              </a>
              <div className="my-4 border border-b-0 border-gray-200 dark:border-gray-600"></div>

              <div className="m-auto mt-3 flex items-center justify-around text-center text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      favoriteMutation.mutate({
                        address: address as string,
                        hash: transaction.hash,
                      })
                    }>
                    {favorites.includes(transaction.hash) ? <RedHeart /> : <TransparentHeart />}
                  </button>
                </div>
                <div className="flex items-center">
                  <span className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    {transaction.asset}
                  </span>
                </div>
                {transaction?.value && (
                  <div className="flex items-center">
                    <span className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      💰&nbsp;&nbsp;${transaction?.value?.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex items-center">
                  <span className="hidden rounded bg-gray-100 px-1.5 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300 md:block">
                    🧱&nbsp;&nbsp;{transaction.blockNum}
                  </span>
                </div>
                <div className="flex flex-row items-center">
                  <span className="rounded bg-gray-100 py-0.5 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    {transaction.category.toUpperCase()}
                  </span>
                </div>
                <a
                  className="flex w-[25%] items-center"
                  href={`https://etherscan.io/tx/${transaction.hash}`}
                  rel="noopener noreferrer"
                  target="_blank">
                  <span className="truncate rounded bg-blue-100 px-1.5 py-0.5 text-xs font-semibold text-blue-900 hover:cursor-pointer hover:bg-blue-200 hover:text-blue-400 hover:underline dark:bg-blue-200 dark:text-blue-900 dark:hover:bg-blue-300">
                    {transaction.hash}
                  </span>
                </a>
              </div>
            </section>
          );
        })}
    </main>
  );
};
export default Feed;

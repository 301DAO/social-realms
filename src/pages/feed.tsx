import * as React from 'react';
import { useMutation, useQuery } from 'react-query';

import { favorite } from '@/lib/mutations';
import { fetchAssetTransfers } from '@/lib';
import { queryClient } from '@/lib/clients';
import { LoadingTransaction } from '@/components';
import { Transfer } from '@/lib/wrappers/alchemy.types';
import { useIsMounted, useFavorites, useUser, useBlockDateTime } from '@/hooks';
import { DownArrow, RedHeart, TransparentHeart } from '@/components/icons';

const Feed = () => {
  const isMounted = useIsMounted();

  const { user } = useUser({ redirectTo: '/login' });
  const address = user?.publicAddress as string;

  const [favorites] = useFavorites({ address });

  const favoriteMutation = useMutation(
    ({ address, hash }: { address: string; hash: string }) => favorite({ address, hash }),
    {
      onSuccess: () => queryClient.invalidateQueries(['favorites', address]),
    }
  );

  const { data } = useQuery(['asset-transfers'], async () => await fetchAssetTransfers(address));
  const { transfers } = data || {};

  let readyTransactions = transfers ?? [];

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

  return (
    <main className="mx-auto mt-6 flex w-full flex-col items-center justify-items-start gap-y-4 align-top text-white md:mt-12">
      {readyTransactions &&
        readyTransactions.length > 0 &&
        readyTransactions.map((transaction: Transfer, idx: number) => {
          return (
            <TransactionCard
              transaction={transaction}
              isFavorite={favorites.includes(transaction.hash)}
              onFavorite={() =>
                favoriteMutation.mutate({
                  address: address as string,
                  hash: transaction.hash,
                })
              }
              key={idx}
            />
          );
        })}
    </main>
  );
};
export default Feed;

const TransactionCard = ({
  transaction,
  onFavorite,
  isFavorite,
}: {
  transaction: Transfer;
  onFavorite: () => void;
  isFavorite: boolean;
}) => {
  const blockOccurredOn = useBlockDateTime(Number(transaction.blockNum));
  return (
    <section
      key={transaction.hash}
      className="w-full max-w-2xl rounded-xl border border-gray-200 bg-white p-4 text-center dark:border-gray-800 dark:bg-gray-800">
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

      <div className="m-auto mt-3 flex items-center justify-around space-x-[5px] text-center text-gray-500 dark:text-gray-400">
        <div className="flex items-center">
          <button onClick={onFavorite}>{isFavorite ? <RedHeart /> : <TransparentHeart />}</button>
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
            {blockOccurredOn}
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
        {/* <p className="flex w-[25%] items-center">
          <span className="truncate rounded bg-blue-100 px-1.5 py-0.5 text-xs font-semibold text-blue-900 hover:cursor-pointer hover:bg-blue-200 hover:text-blue-400 hover:underline dark:bg-blue-200 dark:text-blue-900 dark:hover:bg-blue-300">
            {blockOccurredOn}
          </span>
        </p> */}
      </div>
    </section>
  );
};

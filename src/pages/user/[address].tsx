import clsx from 'clsx';
import * as React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { useBalance, useEnsLookup, useEnsAvatar, useEnsResolveName } from 'wagmi';

import { Row } from '@/components';
import { valueExists } from '@/utils';
import { queryClient } from '@/lib/clients';
import { Gallery } from '@/components/layouts';
import { follow, unfollow } from '@/lib/mutations';
import { retrieveNftsByAddress } from '@/lib/wrappers';
import { useUser, useFollowers, useFollowings, useIsFollowed, useCopyToClipboard } from '@/hooks';

enum tab {
  FOLLOWING,
  FOLLOWERS,
}

const User: NextPage = () => {
  const { user } = useUser({ redirectTo: '/login' });
  const myAddress = user?.publicAddress as string;

  const router = useRouter();
  const { address: _param } = router.query;
  const param = _param as string;

  const [currentTab, setCurrentTab] = React.useState<tab>(tab.FOLLOWERS);

  const [{ data: _name }] = useEnsLookup({
    address: param,
    skip: !!param && param.endsWith('.eth'),
  });
  const name = !!param && param.endsWith('.eth') ? param : _name;

  const [{ data: image }] = useEnsAvatar({
    addressOrName: param,
    skip: !!param && !param.endsWith('.eth'),
  });

  const [{ data: _address }] = useEnsResolveName({
    name: param,
    skip: !!param && param.startsWith('0x'),
  });
  const userAddress = !!param && param.startsWith('0x') ? param : (_address as string);

  const [{ data: balance }] = useBalance({ addressOrName: param });

  const [followers, followersCount] = useFollowers({ address: userAddress });
  const [followings, followingCount] = useFollowings({ address: userAddress });

  const [isFollowed, isFollowedLoading] = useIsFollowed({
    followeeAddress: userAddress,
    followerAddress: myAddress,
  });

  const [, setLoading] = React.useState(false);

  const followMutation = useMutation(
    () => follow({ address: myAddress, addressToFollow: userAddress }),
    {
      onMutate: async () => setLoading(true),
      onSuccess: async () => {
        await queryClient.invalidateQueries(['followings', userAddress]);
        await queryClient.invalidateQueries(['followers', userAddress]);
        await queryClient.invalidateQueries(['is-followed']);
        setLoading(false);
      },
    }
  );

  const unfollowMutation = useMutation(
    () => unfollow({ address: myAddress, addressToUnfollow: userAddress }),
    {
      onMutate: async () => setLoading(true),
      onSuccess: async () => {
        await queryClient.invalidateQueries(['followings', userAddress]);
        await queryClient.invalidateQueries(['followers', userAddress]);
        await queryClient.invalidateQueries(['is-followed', userAddress]);
        setLoading(false);
      },
      onSettled: async () => setLoading(false),
    }
  );

  const followUser = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    return isFollowed ? unfollowMutation.mutate() : followMutation.mutate();
  };

  const [, copy] = useCopyToClipboard();

  const { data: nftsQueryResponse } = useQuery(
    ['nfts-query', userAddress],
    async () => {
      const { continuation, nfts } = await retrieveNftsByAddress({
        address: userAddress,
      });
      return nfts;
    },
    {
      enabled: valueExists(userAddress) && userAddress.startsWith('0x'),
      notifyOnChangeProps: 'tracked',
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const followingTab = React.useCallback(() => setCurrentTab(tab.FOLLOWING), []);
  const followersTab = React.useCallback(() => setCurrentTab(tab.FOLLOWERS), []);

  const isSelf = userAddress?.toLowerCase() === myAddress?.toLowerCase();

  return (
    <main
      className={clsx(
        `grid h-fit w-full grid-cols-1 justify-center md:gap-4 md:px-4`,
        `md:grid-cols-3`
      )}>
      <section className="col-span-1">
        <div className={clsx(`flex w-full justify-center px-3`)}>
          <div
            className={clsx(
              `mb-3 flex w-full flex-col items-center justify-items-center rounded-lg bg-white bg-no-repeat py-4 text-center align-middle shadow xl:py-5`,
              `dark:bg-transparent`
            )}>
            <img
              className="mb-2 rounded-lg"
              src={image ?? '/images/placeholder.png'}
              alt={`${name}'s avatar`}
            />
            <ul className="scale-85 mt-3 flex w-full max-w-[420px] flex-col justify-center space-y-2">
              <li className="flex justify-between font-bold dark:text-white">
                <button
                  onClick={() => copy(`${name}`)}
                  className="hover:cursor-pointer hover:underline">
                  {name}
                </button>
                <span>{balance && `${balance.formatted.slice(0, 4)}Ξ`}</span>
              </li>
              <li className="text-gray-500 truncate dark:text-gray-400 text-ellipsis">
                <button
                  onClick={() => copy(`${userAddress}`)}
                  className="truncate hover:cursor-pointer hover:underline">
                  {userAddress}
                </button>
              </li>
              <li className="w-full pt-1">
                <button
                  disabled={isSelf || isFollowedLoading}
                  onClick={followUser}
                  type="button"
                  className={clsx(
                    `group relative mb-2 inline-flex w-full items-center justify-center overflow-hidden rounded-lg p-0.5 text-sm font-medium text-gray-900 hover:text-white dark:text-white`,

                    `bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/50 hover:bg-gradient-to-br focus:ring-4 focus:ring-cyan-300 dark:shadow-lg dark:shadow-cyan-800/80 dark:focus:ring-cyan-800`,
                    isSelf && 'hidden',
                    isFollowed && `bg-cyan-400`
                  )}>
                  <span
                    className={clsx(
                      `relative flex w-full items-center justify-center rounded-md bg-white px-5 py-2.5 align-middle transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900`,
                      isFollowed && `dark:bg-opacity-10`
                    )}>
                    {isFollowed ? 'UNFOLLOW' : isFollowedLoading ? 'LOADING...' : 'FOLLOW'}
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={clsx(
            `mb-4 w-full rounded-xl bg-white shadow dark:border-2 dark:border-gray-600 dark:bg-transparent`
          )}>
          <ul className="flex divide-x divide-gray-200 rounded-sm shadow dark:divide-gray-700 sm:flex">
            <li className="w-full">
              <button
                className={clsx(
                  `relative inline-block w-full rounded-t-lg py-4 px-4 text-center text-sm font-medium focus:z-20 focus:ring-4 dark:text-white`,
                  currentTab === tab.FOLLOWERS
                    ? `active bg-gray-100 text-gray-700 focus:ring-blue-300 dark:bg-gray-800`
                    : `bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 focus:ring-blue-300 dark:bg-transparent dark:hover:bg-gray-700 dark:hover:text-white`
                )}
                onClick={followersTab}>
                FOLLOWERS
              </button>
            </li>

            <li className="w-full">
              <button
                className={clsx(
                  `relative inline-block w-full rounded-t-lg py-4 px-4 text-center text-sm font-medium focus:z-20 focus:ring-4 dark:text-white`,
                  currentTab === tab.FOLLOWING
                    ? `active bg-gray-100 text-gray-700 focus:ring-blue-300 dark:bg-gray-800`
                    : `bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 focus:ring-blue-300 dark:bg-transparent dark:hover:bg-gray-700 dark:hover:text-white`
                )}
                onClick={followingTab}>
                FOLLOWING
              </button>
            </li>
          </ul>
          <ul className="px-6 py-4 divide-y divide-gray-200 rounded-b-xl dark:divide-gray-700 dark:bg-gray-800">
            {currentTab === tab.FOLLOWERS ? (
              followers.map((address, idx) => (
                <li className="py-3 hover:cursor-pointer sm:py-4" key={idx}>
                  <Row address={address} key={`${followers}`} />
                </li>
              ))
            ) : (
              <></>
            )}
            {currentTab === tab.FOLLOWING ? (
              followings.map((address, idx) => (
                <li className="py-3 sm:py-4" key={idx}>
                  <Row address={address} />
                </li>
              ))
            ) : (
              <></>
            )}
            <p className="text-white">
              {currentTab === tab.FOLLOWERS &&
                followersCount === 0 &&
                `No one is following ${name} yet.`}
              {currentTab === tab.FOLLOWING &&
                followingCount === 0 &&
                `${name} is not following anyone.`}
            </p>
          </ul>

          {/* <a
            href="#"
            className="inline-flex items-center p-2 text-xs font-medium text-blue-700 uppercase rounded-lg sm:text-sm hover:bg-gray-100 dark:text-blue-500 dark:hover:bg-gray-700">
            SEE ALL
            <svg
              className="w-4 h-4 ml-1 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"></path>
            </svg>
          </a> */}
        </div>
      </section>

      <section className="col-span-2">
        <div className="w-full py-4 mb-4 bg-white bg-no-repeat rounded-lg shadow dark:bg-transparent">
          <Gallery nfts={nftsQueryResponse ?? []} />
        </div>
      </section>
    </main>
  );
};

export default User;

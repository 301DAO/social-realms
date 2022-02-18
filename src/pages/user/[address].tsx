import {
  useCopyToClipboard,
  useEnsImage,
  useFollowers,
  useFollowings,
  useIsFollowed,
  useQueryENS,
  useUser,
} from '@/hooks';
import { Gallery } from '@/components/layouts';
import { follow, unfollow } from '@/lib/mutations';
import { queryClient } from '@/lib/clients';
import { retrieveNftsByAddress } from '@/lib/wrappers';
import clsx from 'clsx';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useBalance } from 'wagmi';
import { Row } from '@/components';

type TAB = 'FOLLOWERS' | 'FOLLOWING';
const tabsReducer = (state: any, action: { type: TAB }) => {
  switch (action.type) {
    case 'FOLLOWING':
      return {
        FOLLOWING: true,
        FOLLOWERS: false,
      };
    case 'FOLLOWERS':
      return {
        FOLLOWING: false,
        FOLLOWERS: true,
      };
    default:
      return state;
  }
};
const initialState = { FOLLOWING: false, FOLLOWERS: true };

const User: NextPage = () => {
  const { user } = useUser({ redirectTo: '/login' });
  const myAddress = user?.publicAddress;

  const router = useRouter();
  const { address: param } = router.query;
  const [tab, dispatch] = React.useReducer(tabsReducer, initialState);

  const [userAddress, name] = useQueryENS({
    address: param as string,
    name: param as string,
    enabled: !!param,
  });
  // this is so if it's a contract address, useQueryENS will return empty address
  //const userAddress = React.useMemo(() => address ?? param, []);

  const [image] = useEnsImage(name as string);
  const [{ data: balance }] = useBalance({ addressOrName: userAddress as string });

  const [followers, followersCount] = useFollowers({ address: userAddress as string });
  const [followings, followingCount] = useFollowings({ address: userAddress as string });

  const [isFollowed, isFollowedLoading] = useIsFollowed({
    followeeAddress: userAddress as string,
    followerAddress: myAddress as string,
  });

  const [, setLoading] = React.useState(false);

  const followMutation = useMutation(
    () =>
      follow({
        address: myAddress as string,
        addressToFollow: userAddress as string,
      }),
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
    () =>
      unfollow({
        address: myAddress as string,
        addressToUnfollow: userAddress as string,
      }),
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
        address: userAddress as string,
      });
      return nfts;
    },
    {
      enabled: (userAddress as string).startsWith('0x'),
      notifyOnChangeProps: 'tracked',
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const followingTab = React.useCallback(() => dispatch({ type: 'FOLLOWING' }), []);
  const followersTab = React.useCallback(() => dispatch({ type: 'FOLLOWERS' }), []);

  return (
    <main className={clsx(`grid h-fit grid-cols-1 justify-center gap-2 px-6`, `md:grid-cols-3`)}>
      <section className={clsx(`col-span-1`)}>
        <div className={clsx(`flex w-full justify-center`)}>
          <div
            className={clsx(
              `mb-3 flex w-full flex-col items-center justify-items-center rounded-lg bg-white bg-no-repeat p-2 text-center align-middle shadow sm:p-4 xl:p-6`,
              `dark:bg-gray-800`
            )}>
            <img
              className="mb-2 rounded-lg"
              src={image ?? '/images/placeholder.png'}
              alt="Jese portrait"
            />
            <ul className="scale-85 mt-3 flex w-full max-w-[420px] flex-col justify-center space-y-2">
              <li className="flex justify-between font-bold dark:text-white">
                <a onClick={() => copy(`${name}`)} className="hover:cursor-pointer hover:underline">
                  {name}
                </a>
                <span>{balance && `${balance.formatted.slice(0, 4)}Ξ`}</span>
              </li>
              <li className="truncate text-gray-500 dark:text-gray-400">
                <a
                  onClick={() => copy(`${userAddress}`)}
                  className="hover:cursor-pointer hover:underline">
                  {userAddress}
                </a>
              </li>
              <li className="w-full pt-1">
                <button
                  onClick={followUser}
                  type="button"
                  className={clsx(
                    `group relative mb-2 inline-flex w-full items-center justify-center overflow-hidden rounded-lg p-0.5 text-sm font-medium text-gray-900 hover:text-white dark:text-white`,

                    `bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/50 hover:bg-gradient-to-br focus:ring-4 focus:ring-cyan-300 dark:shadow-lg dark:shadow-cyan-800/80 dark:focus:ring-cyan-800`,
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

        <div className={clsx(`mb-4 w-full rounded-xl bg-white pb-6 shadow dark:bg-gray-800`)}>
          <div className="flow-root">
            <ul className="flex divide-x divide-gray-200 rounded-sm shadow dark:divide-gray-700 sm:flex">
              <li className="w-full">
                <button
                  className={clsx(
                    `relative inline-block w-full rounded-l-lg py-4 px-4 text-center text-sm font-medium focus:z-20 focus:ring-4 dark:text-white`,
                    tab['FOLLOWERS']
                      ? `active bg-gray-100 text-gray-900  focus:ring-blue-300 dark:bg-gray-700`
                      : `bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 focus:ring-blue-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`
                  )}
                  onClick={followersTab}>
                  FOLLOWERS
                </button>
              </li>

              <li className="w-full">
                <button
                  className={clsx(
                    `relative inline-block w-full rounded-r-lg py-4 px-4 text-center text-sm font-medium focus:z-20 focus:ring-4 dark:text-white`,
                    tab['FOLLOWING']
                      ? `active bg-gray-100 text-gray-900  focus:ring-blue-300 dark:bg-gray-700`
                      : `bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 focus:ring-blue-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`
                  )}
                  onClick={followingTab}>
                  FOLLOWING
                </button>
              </li>
            </ul>
            <ul role="list" className="divide-y divide-gray-200 p-5 px-6 dark:divide-gray-700">
              {tab['FOLLOWERS'] &&
                followers.map((address, idx) => (
                  <li className="py-3 hover:cursor-pointer sm:py-4" key={idx}>
                    <Row address={address} />
                  </li>
                ))}
              {tab['FOLLOWING'] &&
                followings.map((address, idx) => (
                  <li className="py-3 sm:py-4" key={idx}>
                    <Row address={address} />
                  </li>
                ))}
              <p className="text-white">
                {tab['FOLLOWERS'] && followersCount === 0 && `No one is following ${name} yet.`}
                {tab['FOLLOWING'] && followingCount === 0 && `${name} is not following anyone.`}
              </p>
            </ul>
          </div>

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
        <div className="mb-4 w-full rounded-lg bg-white bg-no-repeat p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
          <Gallery nfts={nftsQueryResponse ?? []} />
        </div>
      </section>
    </main>
  );
};

export default User;

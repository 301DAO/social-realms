import * as React from 'react';
import clsx from 'clsx';
import type { NextPage } from 'next';
import {
  useEnsImage,
  useFavorites,
  useFollowers,
  useFollowings,
  useQueryENS,
  useUser,
} from '@/hooks';
import { useAccount } from 'wagmi';
import { ProfileRow } from '@/components';

type TAB = 'FOLLOWING' | 'FOLLOWERS' | 'FAVORITES';
const tabsReducer = (state: any, action: { type: TAB }) => {
  switch (action.type) {
    case 'FOLLOWING':
      return {
        FOLLOWING: true,
        FOLLOWERS: false,
        FAVORITES: false,
      };
    case 'FOLLOWERS':
      return {
        FOLLOWING: false,
        FOLLOWERS: true,
        FAVORITES: false,
      };
    case 'FAVORITES':
      return {
        FOLLOWING: false,
        FOLLOWERS: false,
        FAVORITES: true,
      };
    default:
      return state;
  }
};
const initialState = {
  FOLLOWING: true,
  FOLLOWERS: false,
  FAVORITES: false,
};

const TabButton = ({
  tab,
  onClick,
  text,
  count,
}: {
  tab: TAB;
  onClick: () => void;
  text: string;
  count: number;
}) => (
  <button
    className={clsx(
      `relative inline-block w-full rounded-tl-lg py-4 px-4 text-center text-sm font-medium focus:z-20 focus:ring-4 dark:text-white`,
      tab
        ? `active bg-gray-100 text-gray-900  focus:ring-blue-300 dark:bg-gray-700`
        : `bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 focus:ring-blue-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`
    )}
    onClick={onClick}
  >
    {text} ({count})
  </button>
);

const Profile: NextPage = () => {
  const { user } = useUser({ redirectTo: '/login' });

  const [tab, dispatch] = React.useReducer(tabsReducer, initialState);

  const [{ data: account }] = useAccount();
  const [address, name] = useQueryENS({ address: user?.publicAddress });

  const [image] = useEnsImage(name as string);
  // const [{ data: balance }] = useBalance({ addressOrName: address as string });

  const [followers, followersCount] = useFollowers({ address: address as string });
  const [followings, followingCount] = useFollowings({ address: address as string });
  const [favorites, favoritesCount] = useFavorites({ address: address as string });

  const followingTab = React.useCallback(() => dispatch({ type: 'FOLLOWING' }), []);
  const followersTab = React.useCallback(() => dispatch({ type: 'FOLLOWERS' }), []);
  const favoritesTab = React.useCallback(() => dispatch({ type: 'FAVORITES' }), []);

  return (
    <main
      className={clsx('flex flex-col items-center justify-center gap-y-12', 'dark:text-gray-50')}
    >
      <section
        className={clsx(`m-auto flex w-40 flex-col items-center justify-center text-center`)}
      >
        <img
          className="mb-4 h-36 w-36 rounded-xl sm:mb-0 xl:mb-4 2xl:mb-0"
          src={image ?? '/images/placeholder.png'}
          alt="Avatar"
        />
        <div
          className={clsx(
            'group mt-8 inline-flex h-9 items-center whitespace-nowrap rounded-full bg-sky-50 p-5 text-lg text-sky-600 hover:cursor-pointer hover:bg-sky-100 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-600',
            'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500'
          )}
        >
          <a
            className={clsx(`flex items-center`, `hover:underline hover:decoration-dotted`)}
            href={`https://app.ens.domains/name/${name}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>{name ?? `Get ENS name`}</span>
            {name && (
              <div data-tip="https://ens.domains" className={clsx('tooltip-bottom tooltip')}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={clsx(
                    'ml-3 h-5 w-5 overflow-visible text-sky-300 group-hover:text-sky-400 ',
                    `dark:text-gray-500 dark:group-hover:text-gray-400`
                  )}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </a>
        </div>
      </section>

      <section className="mb-4 flow-root w-full rounded-xl bg-white pb-6 shadow dark:bg-gray-800 md:max-w-[865px]">
        <ul className="flex divide-x divide-gray-200 rounded-sm shadow dark:divide-gray-700 sm:flex">
          <li className="w-full">
            <TabButton
              tab={tab['FOLLOWING']}
              onClick={followingTab}
              text="FOLLOWINGS"
              count={followingCount}
            />
          </li>
          <li className="w-full">
            <TabButton
              tab={tab['FOLLOWERS']}
              onClick={followersTab}
              text="FOLLOWERS"
              count={followersCount}
            />
          </li>
          <li className="w-full">
            <TabButton
              tab={tab['FAVORITES']}
              onClick={favoritesTab}
              text="FAVORITES"
              count={favoritesCount}
            />
          </li>
        </ul>
        <ul role="list" className="divide-y divide-gray-200 p-5 px-6 dark:divide-gray-700">
          {tab['FOLLOWERS'] &&
            followers.map((address, idx) => (
              <li className="w-full py-3 sm:py-4" key={idx}>
                <ProfileRow
                  userAddress={address}
                  myAddress={account?.address as string}
                  type="FOLLOWER"
                />
              </li>
            ))}
          {tab['FOLLOWING'] &&
            followings.map((address, idx) => (
              <li className="w-full py-3 sm:py-4" key={idx}>
                <ProfileRow
                  userAddress={address}
                  myAddress={account?.address as string}
                  type="FOLLOWING"
                />
              </li>
            ))}
          {tab['FAVORITES'] &&
            favorites.map((hash, idx) => (
              <li className="w-full p-3 hover:underline sm:py-4" key={idx}>
                <a href={`https://etherscan.io/tx/${hash}`}>{hash}</a>
              </li>
            ))}
          <p className="text-white">
            {tab['FOLLOWERS'] && followersCount === 0 && `No one is following you yet.`}
            {tab['FOLLOWING'] && followingCount === 0 && `You are not following anyone.`}
            {tab['FAVORITES'] && favoritesCount === 0 && `You don't have any favorites yet.`}
          </p>
        </ul>
      </section>
    </main>
  );
};

export default Profile;

import * as React from 'react';
import clsx from 'clsx';
import type { NextPage } from 'next';

import { useEnsLookup, useEnsAvatar } from 'wagmi';

import { useFavorites, useFollowers, useFollowings, useUser } from '@/hooks';
import { ProfileRow, Avatar } from '@/components/profile';

enum Tab {
  FOLLOWING,
  FOLLOWERS,
  FAVORITES,
}

const TabButton = ({
  active,
  onClick,
  text,
  count,
}: {
  active: boolean;
  onClick: () => void;
  text: string;
  count: number;
}) => {
  return (
    <button
      className={clsx(
        `relative flex w-full flex-col items-center py-2 md:py-4 px-2 text-center text-xs md:text-sm font-medium focus:z-20 focus:ring-4 dark:text-white md:px-4`,
        text === 'FOLLOWING' && `md:rounded-tl-lg`,
        text === 'FAVORITES' && `rounded-tr-lg`,
        active
          ? `active bg-gray-100 text-gray-900  focus:ring-blue-300 dark:bg-gray-700`
          : `bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 focus:ring-blue-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`
      )}
      onClick={onClick}>
      <span className={clsx(`text-lg md:text-xl font-semibold`)}>{count}</span>
      <span className="">{text}</span>
    </button>
  );
};

const Profile: NextPage = () => {
  const [tab, setTab] = React.useState<Tab>(Tab.FOLLOWING);

  const { authenticated, error, user, status, isError } = useUser({ redirectTo: '/login' });
  const [{ data: name }] = useEnsLookup({ address: user?.publicAddress, skip: !user });
  const [{ data: avatar }] = useEnsAvatar({ addressOrName: name, skip: !authenticated || !name });

  const [followers, followersCount] = useFollowers({ address: user?.publicAddress as string });
  const [followings, followingCount] = useFollowings({ address: user?.publicAddress as string });
  const [favorites, favoritesCount] = useFavorites({ address: user?.publicAddress as string });

  const followingTab = React.useCallback(() => setTab(Tab.FOLLOWING), []);
  const followersTab = React.useCallback(() => setTab(Tab.FOLLOWERS), []);
  const favoritesTab = React.useCallback(() => setTab(Tab.FAVORITES), []);

  return (
    <main
      className={clsx(
        'flex flex-col items-center justify-center gap-y-12 md:mt-10 mx-1.5',
        'dark:text-gray-50'
      )}>
      <section
        className={clsx(`m-auto flex w-40 flex-col items-center justify-center text-center`)}>
        <Avatar imageUrl={avatar ?? '/images/placeholder.png'} />
        <div
          className={clsx(
            'group mt-8 inline-flex h-9 items-center whitespace-nowrap rounded-full bg-sky-50 p-5 text-lg text-sky-600 hover:cursor-pointer hover:bg-sky-100 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-600',
            'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500'
          )}>
          <a
            className={clsx(`flex items-center`, `hover:underline hover:decoration-dotted`)}
            href={`https://app.ens.domains/name/${name}`}
            rel="noopener noreferrer"
            target="_blank">
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
                  fill="currentColor">
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

      <section
        className={clsx(
          `mb-4 flow-root w-full bg-white pb-4 shadow dark:bg-gray-800 md:min-w-[600px] md:max-w-[865px] md:rounded-xl rounded-md`
        )}>
        <ul className="flex divide-x divide-gray-200 rounded-sm shadow dark:divide-gray-700 sm:flex">
          <li className="w-full">
            <TabButton
              active={tab === Tab.FOLLOWING}
              onClick={followingTab}
              text="FOLLOWING"
              count={followingCount}
            />
          </li>
          <li className="w-full">
            <TabButton
              active={tab === Tab.FOLLOWERS}
              onClick={followersTab}
              text="FOLLOWERS"
              count={followersCount}
            />
          </li>
          <li className="w-full">
            <TabButton
              active={tab === Tab.FAVORITES}
              onClick={favoritesTab}
              text="FAVORITES"
              count={favoritesCount}
            />
          </li>
        </ul>
        <ul className="px-3 pt-1 divide-y divide-gray-200 dark:divide-gray-700 md:px-6">
          {tab === Tab['FOLLOWERS'] &&
            followers.map((address, idx) => (
              <li className="w-full py-3 sm:py-4" key={idx}>
                <ProfileRow
                  userAddress={address}
                  myAddress={user?.publicAddress as string}
                  type="FOLLOWER"
                />
              </li>
            ))}
          {tab === Tab['FOLLOWING'] &&
            followings.map((address, idx) => (
              <li className="w-full py-3 sm:py-4" key={idx}>
                <ProfileRow
                  userAddress={address}
                  myAddress={user?.publicAddress as string}
                  type="FOLLOWING"
                />
              </li>
            ))}
          {tab === Tab['FAVORITES'] &&
            favorites.map((hash, idx) => (
              <li className="w-full p-3 hover:underline sm:py-4" key={idx}>
                <a href={`https://etherscan.io/tx/${hash}`}>{hash}</a>
              </li>
            ))}
          <p className="text-white">
            {tab === Tab['FOLLOWERS'] && followersCount === 0 && `No one is following you yet.`}
            {tab === Tab['FOLLOWING'] && followingCount === 0 && `You are not following anyone.`}
            {tab === Tab['FAVORITES'] &&
              favoritesCount === 0 &&
              `You don't have any favorites yet.`}
          </p>
        </ul>
      </section>
    </main>
  );
};

export default Profile;

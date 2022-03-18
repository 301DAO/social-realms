import * as React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { utils } from 'ethers';
import { useMutation } from 'react-query';
import { useEnsLookup, useEnsAvatar, useEnsResolver } from 'wagmi';
import { follow, unfollow } from '@/lib';
import { queryClient } from '@/lib/clients';
import { Twitter } from '@/components/icons';

export const ProfileRow = ({
  myAddress,
  userAddress,
  type,
}: {
  myAddress: string;
  userAddress: string;
  type: 'FOLLOWER' | 'FOLLOWING';
}) => {
  const [, setLoading] = React.useState(false);

  const [{ data: name }] = useEnsLookup({ address: userAddress });
  const [{ data: image }] = useEnsAvatar({ addressOrName: name });
  const [{ data: resolver }] = useEnsResolver({ name, skip: !name });

  const [twitter, setTwitter] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (!name || !resolver) return;
    resolver.getText('com.twitter').then(twitter => {
      if (!twitter) return;
      setTwitter(twitter);
    });
  }, [name, resolver]);

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
    return type === 'FOLLOWING' ? unfollowMutation.mutate() : followMutation.mutate();
  };

  return (
    <div className="flex w-full items-center justify-between space-x-4 md:space-x-8">
      <img
        className="h-8 w-8 rounded-full"
        src={image ?? `/images/placeholder.png`}
        alt="ens avatar"
      />

      <div className="mr-auto">
        <Link href={`/user/${name}`} passHref>
          <a
            className={clsx(
              `truncate text-sm font-medium text-gray-900 md:text-lg`,
              `hover:decoration-solid dark:text-white dark:hover:text-gray-200`
            )}>
            {name}
          </a>
        </Link>
      </div>
      <div className="hidden md:w-full"></div>

      <p className="mr-auto truncate text-sm font-medium text-gray-900 dark:text-white md:whitespace-normal md:text-lg">
        {utils.getAddress(userAddress)}
      </p>
      <div className="hidden md:w-full"></div>
      {twitter ? (
        <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer">
          <Twitter />
        </a>
      ) : (
        <p className="w-[24px]"></p>
      )}
      <div className="ml-auto">
        <button
          onClick={followUser}
          className="ml-auto flex items-center rounded-lg px-0 text-sm font-medium uppercase text-blue-700 hover:bg-gray-100 dark:text-blue-500 dark:hover:bg-gray-700 sm:text-sm md:px-2 md:text-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6"
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
        </button>
      </div>
    </div>
  );
};

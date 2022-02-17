import * as React from 'react';
import { utils } from 'ethers';
import { useMutation } from 'react-query';
import { follow, unfollow } from '@/lib';
import { queryClient } from '@/lib/clients';
import { useEnsImage } from '@/hooks';
import clsx from 'clsx';

import { useEnsLookup } from 'wagmi';

export const ProfileRow = ({
  myAddress,
  userAddress,
  type,
}: {
  myAddress: string;
  userAddress: string;
  type: 'FOLLOWER' | 'FOLLOWING';
}) => {
  //const [, name] = useQueryENS({ address: userAddress, name: userAddress });
  const [, setLoading] = React.useState(false);

  const [{ data: name }] = useEnsLookup({ address: userAddress });
  const [image] = useEnsImage(name as string);

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
      //	onSettled: async data => console.log(data),
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
    <div className="w-fuuserAddressll flex items-center space-x-4 md:space-x-8">
      <img
        className="h-8 w-8 rounded-full"
        src={image ?? `/images/placeholder.png`}
        alt="ens image"
      />

      <div className="mr-auto">
        <a
          className={clsx(
            `truncate text-sm font-medium text-gray-900`,
            `hover:decoration-solid dark:text-white dark:hover:text-gray-200`
          )}
          href={`https://app.ens.domains/name/${name}`}
          rel="noopener noreferrer"
          target="_blank">
          {name}
        </a>
      </div>
      <div className="w-full"></div>

      <div className="mr-auto">
        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
          {utils.getAddress(userAddress)}
        </p>
      </div>

      <div className="w-full"></div>
      {/* <button>
				<Twitter />
			</button> */}
      <div className="ml-auto">
        <button
          onClick={followUser}
          className="ml-auto items-center rounded-lg p-2 text-xs font-medium uppercase text-blue-700 hover:bg-gray-100 dark:text-blue-500 dark:hover:bg-gray-700 sm:text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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

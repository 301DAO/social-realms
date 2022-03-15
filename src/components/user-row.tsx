import * as React from 'react';
import Link from 'next/link';
import { useEnsAvatar, useEnsLookup } from 'wagmi';

export const Row = ({ address }: { address: string }) => {
  const [{ data: ens }] = useEnsLookup({ address });
  const [{ data: avatar }] = useEnsAvatar({ addressOrName: address });
  return (
    <Link href={`/user/${address}`} passHref prefetch={true}>
      <a className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            className="h-8 w-8 rounded-full"
            src={avatar ?? `/images/placeholder.png`}
            alt="User avatar"
          />
        </div>
        <div className="flex-shrink-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{ens ?? `N/A`}</p>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-gray-900 dark:text-white">{address}</p>
        </div>
      </a>
    </Link>
  );
};

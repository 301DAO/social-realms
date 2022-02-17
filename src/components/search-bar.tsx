import { isValidEthAddress } from '@/utils/string-validators';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { useUser } from '@/hooks';

// TODO: add ENS support
const verifyAddress = (address: string) => {
  if (isValidEthAddress(address) || address.endsWith('.eth')) return true;
  import('react-hot-toast').then(({ toast }) => {
    toast('Invalid Ethereum address / ENS name', {
      position: 'bottom-right',
      style: {
        background: '#f44336',
        color: '#fff',
      },
    });
  });
};

export const SearchBar = () => {
  const router = useRouter();
  const { authenticated } = useUser({});

  const searchText = React.useRef<HTMLInputElement>(null);

  const onSearchClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const search = searchText?.current?.value.trim();
      if (!search || !verifyAddress(search)) return;
      if (authenticated) {
        router.push(`/user/${search}`);
      } else {
        router.push(`/nfts/${search}`);
      }
    },
    [router, authenticated]
  );

  const onEnter = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      const search = searchText?.current?.value.trim();
      if (!search || !verifyAddress(search)) return;
      if (authenticated) {
        router.push(`/user/${search}`);
      } else {
        router.push(`/nfts/${search}`);
      }
    },
    [router, authenticated]
  );

  return (
    <div className={clsx('w-full max-w-lg lg:max-w-xs', !authenticated && 'lg:max-w-lg')}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative text-gray-400 focus-within:text-gray-600">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <input
          ref={searchText}
          onKeyPress={onEnter}
          id="search"
          className="block w-full rounded-md border border-transparent bg-white py-2 pl-10 pr-3 text-lg leading-5 text-gray-900 placeholder-gray-500 focus:border-white focus:outline-none focus:ring-offset-2 sm:text-sm"
          placeholder="Quick ENS / Address Search"
          type="search"
          name="search"
        />
      </div>
    </div>
  );
};

import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import { useProvider, useUser } from '@/hooks';
import { toast } from 'react-hot-toast';
import { utils } from 'ethers';

const toastEm = () => {
  return toast('Invalid Ethereum address / ENS name', {
    position: 'bottom-right',
    style: {
      background: '#f44336',
      color: '#fff',
    },
  });
};

export const SearchBar = () => {
  const router = useRouter();
  const { authenticated } = useUser();

  const provider = useProvider();

  const searchText = React.useRef<HTMLInputElement>(null);

  const validateEnsName = React.useCallback(
    async search => {
      const address = await provider?.resolveName(search);
      if (address) return true;
      return false;
    },
    [provider]
  );

  const validateAddress = (address: string) => {
    try {
      return Boolean(utils.getAddress(address));
    } catch (error) {
      return false;
    }
  };

  const onEnter = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      const search = searchText?.current?.value.trim().toLowerCase();

      if (!search) return toastEm();

      if (search.startsWith('0x')) {
        if (!validateAddress(search)) return toastEm();
        return authenticated ? router.push(`/user/${search}`) : router.push(`/nfts/${search}`);
      }

      return validateEnsName(search)?.then(valid => {
        if (!valid) return toastEm();
        authenticated ? router.push(`/user/${search}`) : router.push(`/nfts/${search}`);
      });
    },
    [validateEnsName, authenticated, router]
  );

  return (
    <div className={clsx('w-full max-w-lg lg:max-w-sm', !authenticated && 'lg:max-w-lg')}>
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
          className="text-md block w-full rounded-md border border-transparent bg-white py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 focus:border-white focus:outline-none focus:ring-offset-2"
          placeholder="Quick ENS / Address Search"
          type="search"
          name="search"
        />
      </div>
    </div>
  );
};

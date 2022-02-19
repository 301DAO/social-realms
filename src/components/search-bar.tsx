import * as React from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { utils } from 'ethers';
import clsx from 'clsx';

import { SearchIcon } from '@/components/icons';
import { useUser } from '@/hooks';
import { TIME } from '@/constants';

import { wagmiProvider } from '@/wallet';

const toastEm = (text = 'invalid input') => {
  return toast(text, {
    position: 'top-center',
    style: {
      background: '#db7a7f',
      color: '#ffffff',
    },
    duration: TIME.SECOND * 2,
  });
};

export const SearchBar = () => {
  const router = useRouter();
  const { authenticated } = useUser();

  const provider = wagmiProvider();

  const searchText = React.useRef<HTMLInputElement>(null);

  const directToRoute = (input: string) =>
    authenticated ? router.push(`/user/${input}`) : router.push(`/nfts/${input}`);

  const onEnter = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const search = searchText?.current?.value.trim().toLowerCase();

    if (!search) return;

    if (search.startsWith('0x')) {
      return utils.isAddress(search) ? directToRoute(search) : toastEm('Invalid Ethereum address');
    }

    if (search.endsWith('.eth')) {
      return provider?.resolveName(search).then(address => {
        utils.isAddress(address!) ? directToRoute(address!) : toastEm('Invalid ENS name');
      });
    }

    return toastEm('Invalid Ethereum address / ENS name');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={clsx('w-full max-w-lg lg:max-w-lg', !authenticated && 'lg:max-w-lg')}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative text-gray-400 focus-within:text-gray-600">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon />
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

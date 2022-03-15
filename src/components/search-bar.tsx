import * as React from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { utils } from 'ethers';
import clsx from 'clsx';

import { TIME } from '@/constants';
import { SearchIcon } from '@/components/icons';
import { useInjectedProvider, useUser } from '@/hooks';
import { passEnsRegex, passAddressRegex } from '@/utils';

const InvalidEnsToast = () => (
  <p className="text-md w-full leading-normal">
    Unable to verify ENS name.{'\n'}Check here:{' '}
    <a href="https://app.ens.domains/" className="underline hover:font-bold">
      app.ens.domains
    </a>
  </p>
);

const InvalidAddressToast = () => (
  <p>
    Invalid address{'\n'}
    <a
      target="_blank"
      href="https://metamask.zendesk.com/hc/en-us/articles/360015289512"
      rel="noreferrer"
      className="underline"
    >
      Where can I find my address?
    </a>
  </p>
);

const toastEm = ({ content = 'Invalid input' }: { content: string | JSX.Element }) => {
  return toast.error(content, {
    position: 'top-right',
    style: {},
    duration: TIME.SECOND * 2,
  });
};

const possibleKeys = ['Enter', 'Return'];

export const SearchBar = () => {
  const router = useRouter();

  const { authenticated, status } = useUser();

  const provider = useInjectedProvider();

  const searchText = React.useRef<HTMLInputElement>(null);

  const onEnter = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!possibleKeys.includes(event.key) || status !== 'success') return;
    event.preventDefault();
    const search = searchText?.current?.value.trim().toLowerCase();
    if (!search) return;
    const directToRoute = (input: string) =>
      authenticated
        ? router.push(`/user/${input}`, undefined, { shallow: true })
        : router.push(`/nfts/${input}`, undefined, { shallow: true });

    if (search.startsWith('0x')) {
      if (!passAddressRegex(search)) {
        return toastEm({ content: <InvalidAddressToast /> });
      }
      return utils.isAddress(search)
        ? directToRoute(search)
        : toastEm({ content: <InvalidAddressToast /> });
    }

    if (search.endsWith('.eth')) {
      if (!passEnsRegex(search)) return toastEm({ content: <InvalidEnsToast /> });
      return provider?.resolveName(search).then(address => {
        utils.isAddress(address!)
          ? directToRoute(search)
          : toastEm({ content: <InvalidEnsToast /> });
      });
    }

    return toastEm({ content: 'Invalid Ethereum address / ENS name' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={clsx('w-full max-w-lg lg:max-w-lg', !authenticated && 'lg:max-w-lg')}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative text-gray-300 focus-within:text-gray-600">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon />
        </div>
        <input
          ref={searchText}
          onKeyPress={onEnter}
          id="search"
          className="block h-12 w-full rounded-md border border-transparent bg-[#212330] py-2 pl-10 pr-3 text-sm lowercase leading-5 tracking-wider text-gray-200 placeholder-gray-500 placeholder:normal-case placeholder:text-[#b9bbc2] focus:border-[#373b50] focus:placeholder-transparent focus:outline-none focus:ring-transparent focus:ring-offset-[0.3px] sm:text-lg"
          placeholder="Quick ENS / Address Search"
          type="search"
          name="search"
        />
      </div>
    </div>
  );
};

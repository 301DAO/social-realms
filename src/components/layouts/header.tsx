import * as React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { Disclosure, Menu } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { useEnsLookup, useEnsAvatar } from 'wagmi';

import { useUser } from '@/hooks';
import { SearchBar } from '@/components';
import { LogoutIcon } from '@/components/icons';

const navigation = [
  {
    name: 'HOME',
    href: '/',
    requiresAuth: false,
  },
  {
    name: 'FEED',
    href: '/feed',
    requiresAuth: true,
  },
  {
    name: 'PROFILE',
    href: '/profile',
    requiresAuth: true,
  },
];

// TODO: This needs more work. Too many hacky things.

export const Header = () => {
  const { authenticated, error, user, status, isError } = useUser({});
  const [{ data: ens }] = useEnsLookup({ address: user?.publicAddress, skip: !user });
  const [{ data: avatar }] = useEnsAvatar({ addressOrName: ens, skip: !authenticated || !ens });

  // not showing header when loading helps visually with full page loader component
  //if (typeof user === undefined || typeof user === null) return <></>;
  if (status !== 'success') return <></>;
  return (
    <Disclosure
      as="nav"
      className={clsx(
        `border-opacity-25 bg-gray-800 lg:border-none`,
        `border-gray-600 dark:bg-[#14141b]`
      )}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2">
            <div className="relative flex h-20 items-center lg:border-opacity-25">
              <div className="flex items-center px-2 lg:px-0">
                <Link shallow={true} href="/">
                  <a className="flex-shrink-0">
                    <img className="block w-8 invert" src="/images/bird.png" alt="Workflow" />
                  </a>
                </Link>
                {authenticated && (
                  <div className="hidden lg:ml-10 lg:block">
                    <div className="flex space-x-4">
                      {navigation.map(item => (
                        <Link shallow={true} key={item.name} href={item.href}>
                          <a className="rounded-md py-2 px-3 text-sm font-medium">{item.name}</a>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div
                className={clsx(
                  `flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end`,
                  !authenticated && `lg:justify-center`
                )}>
                <SearchBar />
              </div>
              {authenticated && (
                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-700 p-2 text-gray-200 hover:bg-gray-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-600">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              )}
              <div className="hidden lg:ml-4 lg:block">
                <div className="flex items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3 flex flex-shrink-0 items-center gap-x-6">
                    {authenticated && (
                      <>
                        <div>
                          <Link href="/profile" passHref>
                            <button className="flex rounded-sm text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-600">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-10 w-10 rounded-md"
                                src={avatar ?? '/images/placeholder.png'}
                                alt=""
                              />
                            </button>
                          </Link>
                        </div>
                        <Link href="/api/auth/logout" passHref>
                          <button className="flex rounded-sm text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-600">
                            <span className="sr-only">Open user menu</span>
                            <LogoutIcon />
                          </button>
                        </Link>
                      </>
                    )}
                    <div className="flex items-center">
                      <span
                        className={clsx(
                          'h-3 w-3 rounded-full',
                          authenticated ? 'bg-green-300' : !!error ? 'bg-red-400' : 'bg-orange-200'
                        )}></span>
                    </div>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          {authenticated && (
            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map(item => (
                  <Link shallow={true} key={item.name} href={item.href} passHref>
                    <Disclosure.Button
                      as="a"
                      className="block rounded-md py-2 px-3 text-base font-medium">
                      {item.name}
                    </Disclosure.Button>
                  </Link>
                ))}
              </div>
              <div className="border-t pt-4 pb-3">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Link href="/profile" passHref prefetch>
                      <img
                        className="h-10 w-10 rounded-sm"
                        src={avatar ?? '/images/placeholder.png'}
                        alt=""
                      />
                    </Link>
                  </div>

                  <div className="ml-auto">
                    <div className="text-base font-medium text-white">{ens}</div>
                    <div className="w-[200px] truncate text-sm font-medium text-gray-300">
                      {user?.publicAddress}
                    </div>
                  </div>
                  <p className="ml-auto pl-8"></p>
                </div>
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
};

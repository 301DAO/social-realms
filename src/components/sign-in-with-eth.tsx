import * as React from 'react';
import clsx from 'clsx';
import { LoadingSpinner, EthereumIcon } from '@/components/icons';

export const SignInWithEthereum = ({
  disabled,
  onButtonClick,
  status,
}: {
  disabled: boolean;
  onButtonClick: () => void;
  status: string;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onButtonClick}
      type="button"
      className={clsx(
        `text-md group relative mb-2 inline-flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 p-0.5 font-medium text-gray-900 hover:text-white dark:text-white`,
        `bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 shadow-lg shadow-purple-500/50 hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 dark:shadow-lg dark:shadow-purple-800/80 dark:focus:ring-purple-800`,
        status === 'CONNECTED' && `bg-purple-400`
      )}
    >
      <span
        className={clsx(
          `relative flex w-full items-center justify-center rounded-md bg-white px-5 py-2.5 align-middle transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900`,
          status === 'CONNECTING' && `bg-purple-500 text-gray-50 opacity-70`,
          status === 'ERROR' && `dark:bg-gray-70 text-white opacity-90`,
          status === 'CONNECTED' && `dark:bg-opacity-10`
        )}
      >
        {status === 'CONNECTING' ? (
          <>
            Check Wallet &nbsp;&nbsp;&nbsp;
            <LoadingSpinner />
          </>
        ) : (
          <>
            <EthereumIcon />
            Sign In with Ethereum
          </>
        )}
      </span>
    </button>
  );
};

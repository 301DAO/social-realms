import { useIsMounted } from '@/hooks';
import { shortenAddress } from '@/wallet';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useAccount, useConnect } from 'wagmi';

const WalletNav = () => {
  const [{ data: connectData }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount();

  const { connected, connectors } = connectData || {};
  const { address } = accountData || {};

  const isMounted = useIsMounted();
  const router = useRouter();

  const [buttonText, setButtonText] = React.useState('Connect Wallet');

  const shortAddress = React.useMemo(() => {
    if (accountData) {
      const shortened = shortenAddress({ address: address as string, chars: 6 });
      return shortened;
    }
    return '';
  }, [address]);

  React.useEffect(() => {
    if (isMounted && address) setButtonText(shortAddress);
  }, [address, isMounted]);

  const copyToClipboard = React.useCallback(async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setButtonText('Copied');
    setTimeout(() => {
      setButtonText(shortAddress);
    }, 300);
  }, [address, isMounted, shortAddress]);

  const connectWallet = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (connected) {
      copyToClipboard();
    } else {
      // TODO: this will be updated to handle walletConnect
      connect(connectors[0]);
      setButtonText(shortAddress), ((window as any).address = address);
    }
  };

  const disconnectWallet = async () => {
    disconnect();
    setButtonText('Connect Wallet');
    router.replace('/');
  };

  return (
    <>
      <ul
        className={clsx(
          'flex items-center space-x-4 text-sm font-semibold leading-6 text-gray-700 hover:text-black ',
          'dark:text-gray-200'
        )}>
        {/* Connect wallet button */}
        <li>
          <button
            onClick={connectWallet}
            className={clsx(
              'flex h-11 w-[160px] items-center justify-center rounded-lg border bg-[#0c0c0c] px-5 font-semibold text-white shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50',
              'dark:bg-gray-700 dark:hover:bg-gray-900 dark:focus:bg-gray-700 dark:focus:ring-2 dark:focus:ring-gray-900 dark:focus:ring-offset-2 dark:focus:ring-offset-gray-900'
            )}>
            {buttonText}
          </button>
        </li>
        {connected && (
          <li className="flex">
            <button onClick={disconnectWallet}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 dark:text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </li>
        )}
      </ul>
    </>
  );
};
export default WalletNav;

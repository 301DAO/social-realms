import * as React from 'react';
import { switchOnChainChange, switchNetwork } from '@/wallet';
import { switchNetworkToast } from '@/components';

const ETHEREUM_CHAIN_ID = '0x1';

const removeToast = () => import('react-hot-toast').then(_ => _.toast.remove());

const switchNetworkOnLoad = async (switchToChainId: string) => {
  if (typeof window === 'undefined') return;
  try {
    return window?.ethereum?.request({ method: 'eth_chainId' }).then(async chainId => {
      if (chainId !== switchToChainId) {
        await switchNetwork(switchToChainId);
        await switchNetworkToast();
      } else {
        await removeToast();
      }
    });
  } catch (error) {
    console.log(
      `Encountered error while switching network: `,
      error instanceof Error ? error.message : error
    );
  }
  return;
};

export const useSwitchToEthereum = () => {
  return React.useEffect(() => {
    if (typeof window === 'undefined' || typeof window.ethereum === 'undefined') return;

    // prompts user to switch to Eth network when chain changes while user is on
    switchOnChainChange({
      switchToChainId: ETHEREUM_CHAIN_ID,
      onChainChange: switchNetworkToast,
      onChainChangeSettled: removeToast,
    });

    // This is for when user first lands on the page and is not on the ethereum chain
    switchNetworkOnLoad(ETHEREUM_CHAIN_ID);
  }, []);
};

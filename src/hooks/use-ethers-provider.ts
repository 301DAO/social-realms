import * as React from 'react';
import { providers } from 'ethers';
import { hasMetaMask } from '@/utils';

export const useProvider = () => {
  try {
    return React.useMemo(() => {
      return hasMetaMask
        ? new providers.Web3Provider(window.ethereum as any)
        : new providers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_PROJECT_ID);
    }, []);
  } catch (error) {
    console.log('error in useProvider: ', error instanceof Error ? error.message : error);
  }
  return null;
};

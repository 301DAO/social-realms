import * as React from 'react';
import axios from 'axios';
import { useSigningProvider } from '@/hooks';

declare const window: any;

const logout = async () =>
  axios
    .get('/api/auth/logout')
    .then(_ => _)
    .catch(_ => console.log(_));

export const useDetectAccountChange = () => {
  const provider = useSigningProvider();

  return React.useEffect(() => {
    if (typeof window.ethereum?.on === 'undefined') return;

    const getOldAddress = provider.getSigner().getAddress();

    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      const [newAddress] = accounts;
      getOldAddress.then(oldAddress =>
        Number(oldAddress) !== Number(newAddress) ? logout() : null
      );
    });
  }, [provider]);
};

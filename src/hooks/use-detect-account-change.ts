import * as React from 'react';
import axios from 'axios';
import { useInjectedProvider } from '@/hooks';
import { valueExists } from '@/utils';

const logout = async () =>
  axios
    .get('/api/auth/logout')
    .then(_ => _)
    .catch(_ => console.log(_));

export const useDetectAccountChange = () => {
  const provider = useInjectedProvider();

  return React.useEffect(() => {
    if (typeof window.ethereum?.on === 'undefined') return;

    return window.ethereum.on('accountsChanged', async (accounts: string[]) => {
      const [newAddress] = accounts;
      return provider
        .getSigner()
        .getAddress()
        .then(oldAddress => {
          if (!valueExists(oldAddress) || !valueExists(newAddress)) return;
          return Number(oldAddress) !== Number(newAddress) ? logout() : null;
        })
        .catch(_ => console.log(_));
    });
  }, [provider]);
};

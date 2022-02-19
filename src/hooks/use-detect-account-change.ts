import * as React from 'react';
import axios from 'axios';
import { useProvider } from '@/hooks';

const logout = async () =>
  axios
    .get('/api/auth/logout')
    .then(_ => _)
    .catch(_ => console.log(_));

export const useDetectAccountChange = () => {
  const provider = useProvider();
  return React.useEffect(() => {
    if (typeof window.ethereum?.on === 'undefined') return;

    provider
      ?.getSigner()
      .getAddress()
      .then(address => {
        (window.ethereum as any).on('accountsChanged', (accounts: string[]) => {
          const [, newAddress] = accounts;
          if (newAddress !== address) {
            logout();
          }
        });
      });
  }, []);
};

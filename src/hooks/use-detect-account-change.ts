import * as React from 'react';
import axios from 'axios';
import { providers } from 'ethers';

const logout = async () =>
  axios
    .get('/api/auth/logout')
    .then(_ => _)
    .catch(_ => console.log(_));

export const useDetectAccountChange = () => {
  return React.useEffect(() => {
    if (typeof window.ethereum?.on === 'undefined') return;
    const provider = new providers.Web3Provider(window.ethereum as any);

    provider
      .getSigner()
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

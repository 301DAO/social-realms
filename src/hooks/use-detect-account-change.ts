import * as React from 'react';
import axios from 'axios';

import { useUser } from '@/hooks';

const logout = async () =>
  axios
    .get('/api/auth/logout')
    .then(_ => _)
    .catch(_ => console.log(_));

export const useDetectAccountChange = () => {
  const { status, user } = useUser();

  return React.useEffect(() => {
    if (status !== 'success' || typeof window.ethereum?.on === 'undefined') return;
    // detect account change
    window.ethereum.on('accountsChanged', logout);
  }, [status, user]);
};

import { useIsMounted } from '@/hooks';
import * as React from 'react';
import type { User } from '@prisma/client';
import { useQuery } from 'react-query';
import Router from 'next/router';
import axios from 'axios';

type AuthResponse = {
  authenticated: boolean;
  message: string;
  user: User | null;
};

const fetchUser = async (): Promise<AuthResponse> => {
  try {
    const { data, status, statusText } = await axios.post('/api/auth');
    return data;
  } catch (error) {
    console.log('fetchUser: ', error instanceof Error ? error.message : error);

    // if (axios.isAxiosError(error)) {
    //   // TODO: add custom logging
    //   return error.response?.data || { authenticated: false, message: '', user: null };
    // }
  }
  return { authenticated: false, message: '', user: null };
};

type userHookRedirects = {
  redirectTo?: string;
  redirectIfFound?: boolean;
};

export function useUser({ redirectTo, redirectIfFound }: userHookRedirects = {}) {
  const isMounted = useIsMounted();
  const { data, error, isIdle, isFetched, isError } = useQuery(['user'], fetchUser, {
    retry: 0,
    enabled: isMounted,
  });

  const authenticated = data?.authenticated ?? false;
  const user = data?.user;
  const hasUser = authenticated;

  React.useEffect(() => {
    if (!redirectTo || !isFetched) return;
    if (redirectIfFound && hasUser) {
      Router.push(redirectTo);
    }
    if (redirectTo && !redirectIfFound && !hasUser) {
      Router.push(redirectTo);
    }
  }, [redirectTo, redirectIfFound, hasUser, isFetched]);

  return { authenticated, user, error };
}

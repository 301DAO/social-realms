import * as React from 'react';
import Router from 'next/router';
import { useQuery } from 'react-query';
import { useIsMounted } from '@/hooks';
import { fetchUser } from '@/lib/auth';

type UserHookRedirects = {
  redirectTo?: string;
  redirectIfFound?: boolean;
};

type Status = 'loading' | 'success';

export const useUser = ({ redirectTo, redirectIfFound }: UserHookRedirects = {}) => {
  const isMounted = useIsMounted();

  // TODO: only fetch when wallet is connected
  const { data, error, isIdle, isFetched, isError, isLoading, isStale, isSuccess, isFetching } =
    useQuery(['user'], fetchUser, {
      retry: 0,

      enabled: isMounted,
    });

  const user = data?.user;
  const authenticated = data?.authenticated ?? false;
  const status: Status = typeof data?.authenticated === 'boolean' ? 'success' : 'loading';

  React.useEffect(() => {
    if (!redirectTo || !isFetched) return;
    if (redirectIfFound && authenticated) Router.push(redirectTo);
    if (redirectTo && !redirectIfFound && !authenticated) Router.push(redirectTo);
  }, [redirectTo, redirectIfFound, authenticated, isFetched]);

  return {
    authenticated,
    user,
    error,
    isFetching,
    isLoading,
    status,
    isIdle,
    isStale,
    isSuccess,
    isError,
  };
};

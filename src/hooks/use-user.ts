import { useIsMounted } from '@/hooks';
import * as React from 'react';
import { useQuery } from 'react-query';
import Router from 'next/router';
import { fetchUser } from '@/lib/auth';

type userHookRedirects = {
  redirectTo?: string;
  redirectIfFound?: boolean;
};

export function useUser({ redirectTo, redirectIfFound }: userHookRedirects = {}) {
  const isMounted = useIsMounted();
  const {
    data,
    error,
    isIdle,
    isFetched,
    isError,
    isLoading,
    isStale,
    isSuccess,
    isFetching,
    status,
  } = useQuery(['user'], fetchUser, {
    retry: 0,
    enabled: isMounted,
  });

  const authenticated = data?.authenticated ?? false;
  const user = data?.user;
  const hasUser = Boolean(user);

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
}
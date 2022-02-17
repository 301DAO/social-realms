import { queryClient } from '@/lib/clients';
import * as React from 'react';
import { Hydrate, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export const ReactQueryProvider = ({
  children,
  dehydrateState,
}: {
  children: React.ReactNode;
  dehydrateState: any;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydrateState}>{children}</Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

import * as React from 'react';
import type { NextPage } from 'next';
import clsx from 'clsx';

import { useUser } from '@/hooks';
import { queryClient } from '@/lib/clients';
import { fetchAssetTransfers } from '@/lib';

const Index: NextPage = () => {
  const { user } = useUser({ redirectTo: '/login' });
  const address = user?.publicAddress as string;

  React.useEffect(() => {
    // prefetching feed data on site first visit
    (async () =>
      await queryClient.prefetchQuery(['asset-transfers'], () => fetchAssetTransfers(address), {
        staleTime: Infinity,
        cacheTime: Infinity,
      }))();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mt-20 flex flex-col items-center px-4 text-center align-middle md:mt-40">
      <p
        className={clsx(
          `text-7xl sm:text-8xl md:text-9xl`,
          `inline-block bg-gradient-to-r from-red-400 to-blue-500 bg-clip-text text-center font-extrabold leading-[1.1] tracking-tight text-transparent selection:bg-slate-300 selection:text-[#14141b]`
        )}>
        Social Realms.
      </p>
      <section className="mt-10 flex w-8/12 max-w-xs flex-col items-center gap-y-8 px-9 text-center"></section>
    </main>
  );
};

export default Index;

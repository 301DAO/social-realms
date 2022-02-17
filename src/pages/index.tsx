import type { NextPage } from 'next';
import * as React from 'react';
import { useUser } from '@/hooks';

const Index: NextPage = () => {
  useUser({ redirectTo: '/login' });

  return (
    <main className="mt-40 flex flex-col items-center px-9 text-center align-middle">
      <p
        className="lg:text-10xl xl:text-10xl inline-block bg-gradient-to-r from-red-400 to-blue-500 bg-clip-text pb-8 text-center text-8xl font-extrabold leading-[1.1] tracking-tight text-transparent
          sm:text-9xl">
        Social Realms.
      </p>
      <section className="mt-10 flex w-8/12 max-w-xs flex-col items-center gap-y-8 px-9 text-center"></section>
    </main>
  );
};

export default Index;

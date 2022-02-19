import * as React from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './header';
import { Footer } from './footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark m-auto h-full min-h-screen max-w-screen-2xl bg-[#1a1c26] text-center flex flex-col">
      <Header />
      <div className="rounded-4xl flex flex-col pt-5 pb-20">{children}</div>
      <Footer />
      <Toaster />
    </div>
  );
};

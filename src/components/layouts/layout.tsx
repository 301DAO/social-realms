import * as React from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './header';
import { Footer } from './footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark m-auto flex max-h-full min-h-screen max-w-screen-2xl flex-col bg-[#1d1e2a] text-center">
      <Header />
      <div className="flex h-full max-h-full flex-col rounded-t-[1rem] pt-4 pb-10">{children}</div>
      <Footer />
      <Toaster />
    </div>
  );
};

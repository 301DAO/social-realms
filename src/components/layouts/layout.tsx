import * as React from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './header';
import { Footer } from './footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark m-auto flex h-full min-h-screen max-w-screen-2xl flex-col bg-[#1a1c26] text-center">
      <Header />
      <div className="flex flex-col h-full pt-5 pb-16 rounded-4xl">{children}</div>
      <Footer />
      <Toaster />
    </div>
  );
};

import * as React from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './header';
import { Footer } from './footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark m-auto h-screen max-w-screen-2xl bg-[#1a1c26] text-center">
      <Header />
      <div className="rounded-4xl mb-8 flex flex-col pt-5">{children}</div>
      <Footer />
      <Toaster />
    </div>
  );
};

import * as React from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './header';
import { Footer } from './footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-center` dark m-auto h-screen max-w-screen-2xl self-center bg-[#171821]">
      <Header />
      <div className="mb-8 flex flex-col items-center rounded-xl pt-5">{children}</div>
      <Footer />
      <Toaster />
    </div>
  );
};

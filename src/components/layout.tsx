import { Footer } from '@/components/footer'
import Header from '@/components/header'
import * as React from 'react'
import { tw } from 'twind'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen max-w-screen-xl self-center text-center m-auto bg-[#1f2029]">
      <Header />
      <div className={tw(` flex flex-col mt-6 mb-8`)}>{children}</div>
      <Footer />
    </div>
  )
}

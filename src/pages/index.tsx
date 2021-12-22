import type { NextPage } from 'next'
import * as React from 'react'
import { toast } from 'react-hot-toast'
import { tw } from 'twind'
const Index: NextPage = () => {
  const toaster = () => toast('test it')
  return (
    <div
      className={tw`flex flex-col items-center justify-center align-middle px-9 font-[Inter]
        text-center text-6xl font-extrabold tracking-tighter leading-[1.1] sm:text-7xl lg:text-8xl xl:text-8xl
        `}
    >
      <p
        className={tw(
          'text-8xl font-extrabold pb-8 text-center tracking-tight leading-[1.1] sm:text-9xl lg:text-10xl xl:text-10xl',
          ' inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-500'
        )}
      >
        Social Realms.
      </p>
      <div
        className={tw(
          `space-y-8 text-3xl font-extrabold subpixel-antialiased tracking-wide leading-10 text-center`,
          `dark:text-gray-50`
        )}
      >
        <p>
          Follow your favorite addresses in{' '}
          <span className="underline decoration-slate-100">Crypto</span>
        </p>
        <p>
          Lookup anyone by their{' '}
          <span className="underline decoration-slate-100">ENS</span> or{' '}
          <span className="underline decoration-slate-100">Ethereum</span>{' '}
          address
        </p>
      </div>
    </div>
  )
}
export default Index

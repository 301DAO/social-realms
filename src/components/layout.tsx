// import styles from "@/styles/Layout.module.css";
import Header from '@/components/header'
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'
import * as React from 'react'
import {Footer} from '@/components/footer'
import {Toaster, toast} from 'react-hot-toast'
interface ILayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: ILayoutProps) {
  const { active } = useWeb3React()
  const router = useRouter()
  const isHome = router.pathname === '/'
  React.useEffect(() => {
    const currentPath = router.pathname
    //if (!active && currentPath !== '/') router.push('/')
    // router.prefetch('/feed/[address]')
  }, [ active, router ])
  return (
    <div className="absolute inset-0 bg-[url(/assets/images/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,#ffffff7)]">
      <Header />
      <div className="flex flex-col mt-32 mb-8">{children}</div>
      <Footer />
      <div>
        <Toaster />
      </div>
    </div>
  )
}

// import styles from "@/styles/Layout.module.css";
import { Footer } from '@/components/footer'
import Header from '@/components/header'
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'
import * as React from 'react'
interface ILayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: ILayoutProps) {
  const { active } = useWeb3React()
  const router = useRouter()
  const isHome = router.pathname === '/'
  React.useEffect(() => {}, [active, router])
  return (
    // <div className="absolute inset-0 bg-[url(/assets/images/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,#ffffff7)]">
    <div className="grid-bg">
      <style jsx>{`
        .grid-bg {
          width: 100vw;
          height: 100vh;
          background-image: repeating-linear-gradient(
              #f4f4f414 0 0.6px,
              transparent 0.5px 100%
            ),
            repeating-linear-gradient(
              90deg,
              #fef8fc11 0 0.6px,
              transparent 0.5px 100%
            );

          background-size: 50px 50px;
        }
      `}</style>
      <div className="absolute inset-0 bg-center">
        <Header />
        <div className="flex flex-col mt-12 mb-8">{children}</div>
        <Footer />
        <div>

        </div>
      </div>
    </div>
  )
}

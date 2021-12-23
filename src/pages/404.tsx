// pages/404.js
import type { NextPage } from 'next'
import Head from 'next/head'
import { tw } from 'twind'

const FourOFour: NextPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        width: '500px',
        // height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        background: '#1d1e27',
        color: '#fff',
        fontSize: '12rem',
        fontFamily: "'Fira Mono', monospace",
        letterSpacing: '-7px',
      }}
    >
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <style jsx global>
        {`
          div {
            animation: glitch 1.7s linear infinite;
          }

          @keyframes glitch {
            2%,
            64% {
              transform: translate(1px, 0) skew(0deg);
            }
            4%,
            60% {
              transform: translate(-1px, 0) skew(0deg);
            }
            62% {
              transform: translate(0, 0) skew(25deg);
            }
          }

          div:before,
          div:after {
            content: attr(title);
            position: absolute;
            left: 0;
          }

          div:before {
            animation: glitchTop 1s linear infinite;
            clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
            -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
          }

          @keyframes glitchTop {
            2%,
            64% {
              transform: translate(1px, -1px);
            }
            4%,
            60% {
              transform: translate(-1px, 1px);
            }
            62% {
              transform: translate(13px, -1px) skew(-13deg);
            }
          }

          div:after {
            animation: glitchBotom 1.5s linear infinite;
            clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
            -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
          }

          @keyframes glitchBotom {
            2%,
            64% {
              transform: translate(-1px, 0);
            }
            4%,
            60% {
              transform: translate(-1px, 0);
            }
            62% {
              transform: translate(-22px, 5px) skew(21deg);
            }
          }
        `}
      </style>
      <div className="fourOfour">404</div>
    </div>
  )
}

export default FourOFour

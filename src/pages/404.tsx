import * as React from "react";
import type { NextPage } from "next";

const FourOFour: NextPage = () => {
	return (
		<div>
			{/* <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head> */}
			<main>
				<style jsx>
					{`
						main {
							display: flex;
							max-width: 500px;
							align-items: center;
							justify-content: center;
							margin: 100px auto;
							color: #fff;
							font-size: 10em;
							font-family: "Fira Mono", monospace;
							letter-spacing: -7px;
						}
						div {
							animation: glitch 1.7s linear infinite;
							max-width: 500px;
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
				<div>404</div>
			</main>
		</div>
	);
};

export default FourOFour;

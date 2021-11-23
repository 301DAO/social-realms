import { Card, Display, Image } from "@geist-ui/react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import Head from "next/head";
import * as React from "react";
// import logo from './tweether_logo.png';

const getErrorMessage = (error) => {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser provider detected. Please install MetaMask.";
  } else if (error instanceof UnsupportedChainIdError) {
    return `MetaMask detected an unsupported network. Please switch to another network.`;
  } else if (error instanceof UserRejectedRequestErrorInjected) {
    return "Please authorize this application to access your Ethereum account in Metamask.";
  } else {
    console.log(error);
    return "An unknown error occurred. Please try again.";
  }
};

export default function App() {
  const web3Context = useWeb3React();
  const { library, active, account, chainId, address } = web3Context;
  // TODO: add title, favicon, etc.
  // TODO: add loading screen

  const note = (
    <div style={{ padding: "0 10px" }}>
      <p>
        To use the site make sure to switch to Ropsten network to create your
        DID when prompted “Create new identity.” After having successfully
        created DID, you can switch back to use mainnet to use all features of
        the website.
        <br />
        <br />
        This is necessary as of now since Ceramic only supports testnet at the
        moment. The team is working on having the site use Ceramic mainnet.
      </p>
    </div>
  );
  return (
    <div>
      <Head>
        <title>My Realm</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Display>
        <Image alt="logo" src={"/tweether_logo.png"} />
      </Display>
      <Card shadow w="40">
        <h4>Note</h4>
        {note}
      </Card>
    </div>
  );
}

import { Web3Provider } from "@ethersproject/providers";
import { Card, Display, Grid, Image, Text } from "@geist-ui/react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import type { NextPage } from "next";
import * as React from "react";

const App: NextPage = () => {
  const web3Context = useWeb3React<Web3Provider>();
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'address' does not exist on type 'Web3Rea... Remove this comment to see the full error message
  const { library, active, account, chainId, address } = web3Context;

  const note = (
    <div style={{ padding: "0 10px" }}>
      <Text font={1.2}>
        To use the site make sure to switch to Ropsten network to create your
        DID when prompted “Create new identity.” After having successfully
        created DID, you can switch back to use mainnet to use all features of
        the website.
        <br />
        <br />
        This is necessary as of now since Ceramic only supports testnet at the
        moment. The team is working on having the site use Ceramic mainnet.
      </Text>
    </div>
  );
  return (
    <div>
      <Grid.Container gap={2} justify="center" direction="row">
        <Grid xs={18} md={12} h="250px" w="250px" my="15px">
          <Image alt="logo" src={"/eth_vital.png"} w="100%" h="100%" />
        </Grid>

        <Grid xs={18} md={12} h="250px" w="250px" my="15px">
          <Image alt="logo" src={"/grey_bird.png"} w="100%" h="100%" />
        </Grid>
      </Grid.Container>
      <Display shadow>
        <Card shadow w="40">
          <h4>Note</h4>
          {note}
        </Card>
      </Display>
    </div>
  );
};
export default App;

const getErrorMessage = (error: any) => {
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

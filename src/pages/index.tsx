import { Web3Provider } from "@ethersproject/providers";
import { Card, Display, Grid, Image, Text } from "@geist-ui/react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import type { NextPage } from "next";
import * as React from "react";

const Index: NextPage = () => {
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
export default Index;
import { Card, Display, Grid, Image, Text } from "@geist-ui/react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from "react";

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

export default function App() {
  const web3Context = useWeb3React();
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'address' does not exist on type 'Web3Rea... Remove this comment to see the full error message
  const { library, active, account, chainId, address } = web3Context;

  const note = (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div style={{ padding: "0 10px" }}>
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Text font={1.2}>
        To use the site make sure to switch to Ropsten network to create your
        DID when prompted “Create new identity.” After having successfully
        created DID, you can switch back to use mainnet to use all features of
        the website.
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <br />
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <br />
        This is necessary as of now since Ceramic only supports testnet at the
        moment. The team is working on having the site use Ceramic mainnet.
      </Text>
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </div>
  );
  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div>
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Grid.Container ga={2} justify="center" direction="row">
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Grid xs={18} md={12} h="250px" w="250px" my="15px">
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Image alt="logo" src={"/eth_vital.png"} w="100%" h="100%" />
        </Grid>
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Grid xs={18} md={12} h="250px" w="250px" my="15px">
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Image alt="logo" src={"/grey_bird.png"} w="100%" h="100%" />
        </Grid>
      </Grid.Container>

      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Display shadow>
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Card shadow w="40">
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <h4>Note</h4>
          {note}
        </Card>
      </Display>
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </div>
  );
}

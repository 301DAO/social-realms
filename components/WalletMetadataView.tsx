// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/hooks/useBalance' or its cor... Remove this comment to see the full error message
import { useBalance } from "@/hooks/useBalance";
import {
  authenticateAndGetClient,
  favoriteTransaction,
  follow,
  loadAllFavoriteTransactions,
  loadFollowing,
  unfavoriteTransaction,
  unfollow,
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/store/ceramicStore' or its c... Remove this comment to see the full error message
} from "@/store/ceramicStore";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/wallet/connectors' or its co... Remove this comment to see the full error message
import { injectedConnector } from "@/wallet/connectors";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/wallet/hooks' or its corresp... Remove this comment to see the full error message
import { useEagerConnect, useInactiveListener } from "@/wallet/hooks";
import styled from "@emotion/styled";
import {
  Button,
  Dot,
  Grid,
  Spacer,
  useClipboard,
  useToasts,
} from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import { useWeb3React } from "@web3-react/core";
import Router from "next/router";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from "react";
// @ts-expect-error ts-migrate(6142) FIXME: Module './icons/Ethereum' was resolved to '/Users/... Remove this comment to see the full error message
import { EthereumIcon } from "./icons/Ethereum";
// TODO: rename file

function Account() {
  const { account } = useWeb3React();
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      {account === null
        ? "-"
        : account
        ? `${account.substring(0, 6)}......${account.substring(
            account.length - 4
          )}`
        : ""}
    </>
  );
}

const Container = styled.div`
  width: 50%;
  max-width: calc(100% - 20 px);
  height: 35px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const testingFunction = async function () {
  const ceramicClient = await authenticateAndGetClient();
  await follow(ceramicClient, "0xEd31Df7261CFFe94A81B63c6a408583Cf482f7Ba");
  await loadFollowing(ceramicClient);

  await unfollow(ceramicClient, "0xEd31Df7261CFFe94A81B63c6a408583Cf482f7Ba");
  await loadFollowing(ceramicClient);

  await favoriteTransaction(
    ceramicClient,
    "0xc6ddfacc31833b7c6e5dc59bf58a92706fd006e5dc37872dd0196ea8671be4f3"
  );
  await loadAllFavoriteTransactions(ceramicClient);

  await unfavoriteTransaction(
    ceramicClient,
    "0xc6ddfacc31833b7c6e5dc59bf58a92706fd006e5dc37872dd0196ea8671be4f3"
  );
  await loadAllFavoriteTransactions(ceramicClient);
};
export const WalletMetadataView = () => {
  const context = useWeb3React();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;
  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const [toasts, setToast] = useToasts();
  const { copy } = useClipboard();
  const handleCopy = () => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | null | undefined' is no... Remove this comment to see the full error message
    copy(context.account);
    setToast({ text: "Copied to clipboard" });
  };

  const connectWallet = async () => {
    Router.push("/feed").then(() => {
      setActivatingConnector(injectedConnector);
      activate(injectedConnector);
    });
  };

  const balance = useBalance(context);

  const disconnectWallet = async () => {
    // deactivate(injectedConnector);

    Router.push("/").then(() => {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
      deactivate(injectedConnector);
    });
  };

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Container>
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Grid xs={22}>
        {active ? (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <>
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Button
              auto
              w="45%"
              mx="2px"
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              iconRight={<Icon.Copy />}
              onClick={handleCopy}
            >
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Account />
            </Button>
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Button
              auto
              w="25%"
              mx="2px"
              effect={false}
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              icon={<EthereumIcon />}
            >
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <>{balance}</>
            </Button>
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Button
              onClick={disconnectWallet}
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              icon={<Icon.LogOut />}
              auto
              w="30%"
              mx="2px"
            />
          </>
        ) : (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Button
            mx="5px"
            w="75%"
            scale={1}
            type="success-light"
            onClick={connectWallet}
          >
            Connect your wallet
          </Button>
        )}
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Spacer inline />
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Dot type={active ? "success" : error ? "error" : "warning"} />
      </Grid>
    </Container>
  );
};

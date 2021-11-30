import styled from "@emotion/styled";
import { Button, Grid, Input } from "@geist-ui/react";
import { useWeb3React } from "@web3-react/core";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/contexts/CeramicContext' or ... Remove this comment to see the full error message
import { useCeramicContext } from "@/contexts/CeramicContext";
import { useRouter } from "next/router";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useState } from "react";

const Container = styled.div`
  height: 35px;
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: calc(100% - 20 px);
`;
export const EthAddressSearchView = (props: any) => {
  const {} = props;
  const context = useWeb3React();
  const { client } = useCeramicContext();
  const {
    connector,
    active,
    error,
    activate,
    deactivate,
    library,
    chainId,
    account,
  } = context;
  const [loading, setLoading] = React.useState(false);
  const [userInput, setUserInput] = useState("");

  const onSearchInput = (event: any) => {
    setUserInput(event.target.value);
  };

  const router = useRouter();

  const onSearchSubmit = async (event: any) => {
    event.preventDefault();
    router.push({
      pathname: "/user",
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ pathname: string; as: string; ... Remove this comment to see the full error message
      as: `/user/${userInput}`,
      query: { address: userInput },
    });
  };

  const onEnterPress = async (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      router.push({
        pathname: "/user",
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ pathname: string; as: string; ... Remove this comment to see the full error message
        as: `/user/${userInput}`,
        query: { address: userInput },
      });
    }
  };

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Container>
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Grid.Container justify="center" gap={1.5}>
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Grid xs={14}>
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Input
            mx="5px"
            w="100%"
            scale={1.1}
            placeholder="Type Eth or ENS address . . ."
            clearable
            readOnly={!active}
            onInput={onSearchInput}
            onKeyPress={onEnterPress}
          />
        </Grid>

        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Grid>
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Button
            auto
            type="success-light"
            loading={loading}
            onClick={onSearchSubmit}
          >
            Search
          </Button>
          {/*

        <Spacer inline />
        <Dot type={active ? "success" : error ? "error" : "warning"} /> */}
        </Grid>
      </Grid.Container>
    </Container>
  );
};

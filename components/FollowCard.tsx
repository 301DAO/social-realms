// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/hooks/useEnsData' or its cor... Remove this comment to see the full error message
import { useEnsData } from "@/hooks/useEnsData";
import { Fieldset, Grid, Link, Spacer, Text } from "@geist-ui/react";
import { useWeb3React } from "@web3-react/core";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from "react";
// @ts-expect-error ts-migrate(6142) FIXME: Module './nft-image' was resolved to '/Users/omara... Remove this comment to see the full error message
import NftImage from "./nft-image";
import Router from "next/router";
export const FollowCard = ({
  address
}: any) => {
  const web3Context = useWeb3React();
  const { library, chainId } = web3Context;
  const { ens, url, avatar } = useEnsData({ provider: library, address });
  const topline = ens || address;

  // using router instead of Link because router doesn't reload page
  const onUserClick = async (event: any) => {
    event.preventDefault();
    Router.push(`/user/?address=${topline}`);
  };

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      {console.log("avatar: ", avatar)}
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Fieldset style={{ width: "480px", maxWidth: "calc(100% - 20px)" }}>
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Fieldset.Content py="8pt" px="10pt">
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Grid.Container alignItems="center" justify="flex-start">
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Grid w="33%">
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <NftImage avatar={avatar} isProfilePic={true} />
              {/* <Avatar src={image ? image : placeholderImage} scale={2} /> */}
            </Grid>
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Spacer w="10px" />
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Grid xs={8} w="66%">
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <Grid.Container direction="row">
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Grid xs={20} margin="1px">
                  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Text h4 mx="0px" my="5.5px">
                    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <Link onClick={onUserClick}>{topline}</Link>
                  </Text>
                </Grid>
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <Grid xs={24}>
                  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <Text small>
                    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <Link href={url} target="_blank" block padding="0px">
                      {url && url}
                    </Link>
                  </Text>
                </Grid>
              </Grid.Container>
            </Grid>
          </Grid.Container>
        </Fieldset.Content>
      </Fieldset>
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Spacer inline h="12pt" />
    </>
  );
};

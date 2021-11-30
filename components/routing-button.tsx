import styled from "@emotion/styled";
import { Button, Grid } from "@geist-ui/react";
import Router from "next/router";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from "react";

const Container = styled.div`
  height: 35px;
  display: flex;
  flex-direction: column;
  width: 15%;
`;

// TODO: styling for the button
export const RoutingButton = (props: any) => {
  const {text, pathname,} = props;
  const [loading, setLoading] = React.useState(false);

  const onButtonClick = async (event: any) => {
    event.preventDefault();
    Router.push(pathname);
  };

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Container>
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Grid.Container direction="row" gap={1} justify="center">
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Grid>
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Button
            auto
            type="secondary"
            loading={loading}
            onClick={onButtonClick}
          >
            {text}
          </Button>
        </Grid>
      </Grid.Container>
    </Container>
  );
};

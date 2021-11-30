import { Card, Grid } from "@geist-ui/react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from "react";
// TODO: finish
export default function ReadableTx(props: any) {
  const { datetime, cost } = props;

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Grid>
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Card>{JSON.stringify(props)}</Card>
    </Grid>
  );
}

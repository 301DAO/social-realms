import { Card, Grid } from "@geist-ui/react";
import * as React from "react";
// TODO: finish
export default function ReadableTx(props: any) {
  const { datetime, cost } = props;

  return (

    <Grid>

      <Card>{JSON.stringify(props)}</Card>
    </Grid>
  );
}

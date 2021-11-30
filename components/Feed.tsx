import { Grid } from "@geist-ui/react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from "react";
// @ts-expect-error ts-migrate(6142) FIXME: Module './FeedCard' was resolved to '/Users/omaraz... Remove this comment to see the full error message
import { FeedCard } from "./FeedCard";
export const Feed = (props: any) => {
  const { feedData } = props;

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Grid.Container>
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <FeedCard imgSrc={""} address={item} text={text} profilePath={1} />;
    </Grid.Container>
  );
};

import { Grid } from "@geist-ui/react";
import * as React from "react";
import { FeedCard } from "./FeedCard";
export const Feed = (props) => {
  const { feedData } = props;

  return (
    <Grid.Container>
      <FeedCard imgSrc={""} address={item} text={text} profilePath={1} />;
    </Grid.Container>
  );
};

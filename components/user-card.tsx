import { Badge, Card,Code, Grid, Link, Spacer, Divider, Button, Fieldset, Avatar, Text } from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import { ArrowRight } from "@geist-ui/react-icons";
import { useWeb3React } from "@web3-react/core";
import * as React from "react";
import { parseBigNumberToString } from "util/bigNumberConverter";
import { EnsUser } from "./EnsUser";

interface IUserCard {
  img: string;
  ens: string;
  address: string;
}

export function UserCard({img, ens, address,}: IUserCard) {

  return (
    <>
      <Card width="400px">
        <Card.Content>
          <Grid.Container gap={2} height="100px">
            <Grid xs={8}>
              <Avatar src={img} scale={5}></Avatar>
            </Grid>
            <Grid xs={14} alignContent="center" justify="center">
              <Text b>Description</Text>
            </Grid>
          </Grid.Container>
        </Card.Content>
        <Divider y={0} />
        <Card.Content>
          <Text>
            The Object constructor creates an object wrapper for the given
            value.
          </Text>
          <Text>
            When called in a non-constructor context, Object behaves identically
            to <Code>new Object()</Code>.
          </Text>
        </Card.Content>
      </Card>
      <Fieldset style={{ width: "580px", maxWidth: "calc(100% - 20px)" }}>
        <Fieldset.Content py="8pt" px="10pt">
          <Grid.Container alignItems="center" justify="flex-start">
            <Grid w="44%">
              <Avatar src={img} scale={8}></Avatar>
            </Grid>
            <Spacer w="10px" />
            <Grid xs={2} w="66%">
              <Grid.Container direction="row">
                <Grid xs={28} margin="1px">
                  <Text b font="1.5rem" mx="0px" my="5.5px">
                    {ens}
                  </Text>
                </Grid>
                <Grid xs={24}>
                  <Text small>
                    <Link block padding="0px">
                      {address}
                    </Link>
                  </Text>
                </Grid>
              </Grid.Container>
            </Grid>
          </Grid.Container>
        </Fieldset.Content>

        <Divider my={0} />
        {/* <Fieldset.Content>
          <Text scale={1.25} mb={0}>
            {text}
          </Text>
        </Fieldset.Content> */}
        <Fieldset.Footer
          py="0px"
          px="3px"
          margin="0px"
          style={{ justifyContent: "space-between" }}
        >
          <Button type="abort" auto iconRight={<Icon.Heart />} />

          <Button type="abort" auto scale={2 / 3} iconRight={<Icon.Link />}>
            2021-9-4 21:30:21
          </Button>

          <Button type="abort" auto scale={2 / 3} iconRight={<Icon.Copy />}>
            0xfcc...
          </Button>
        </Fieldset.Footer>
      </Fieldset>
    </>
  );
}

import {
  Avatar,
  Divider,
  Fieldset,
  Grid,
  Link,
  Spacer,
  Text,
} from "@geist-ui/react";
import * as React from "react";

interface IUser {
  img: string;
  ens: string;
  address: string;
  balance?: string;
  url: string;
  footerButton: React.ReactNode;
}
const placeholderImage = `https://external-preview.redd.it/
NADbWsobDS1wOTyi_AcFjYmfKmz6Oxyre1kFSD93Rts.jpg
?auto=webp&s=832a2557421e6f81fb6dfd0110d652941b9de6c6`;

export function UserCard({
  img,
  ens,
  address,
  balance,
  url,
  footerButton,
}: IUser) {
  return (
    <Fieldset style={{ width: "580px", maxWidth: "calc(100% - 20px)" }}>
      <Fieldset.Content py="8pt" px="10pt">
        <Grid.Container alignItems="center" justify="flex-start">
          <Grid w="44%">
            <Avatar src={img ? img : placeholderImage} scale={8} />
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
      <Fieldset.Content>
        <Text scale={1.25} mb={0}>
          Ξ{balance}
        </Text>
        <Text scale={1.25} mb={0}>
          <a href={url}>{url}</a>
        </Text>
      </Fieldset.Content>
      <Fieldset.Footer
        py="0px"
        px="3px"
        margin="0px"
        style={{ justifyContent: "space-between" }}
      >
        {footerButton}
      </Fieldset.Footer>
    </Fieldset>
  );
}

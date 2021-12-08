import { UserCard } from "@/components/user-card";
import { useCeramicContext } from "@/contexts/CeramicContext";
import { useEnsPic, useEtherUser } from "@/hooks/index";
import {
  detectFollowListChange,
  follow,
  loadFollowing,
  unfollow,
} from "@/store/ceramicStore";
import { parseEnsAvatar } from "@/util/ens-avatar-parser";
import { Button, Grid } from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import * as React from "react";

export default function Profile() {
  const { library } = useWeb3React();
  const { client } = useCeramicContext();
  const router = useRouter();
  const address = router?.query?.address;
  const [, setMounted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [followingList, setFollowingList] = React.useState();
  const { url, ens, avatar, ethAddress, balance } = useEtherUser({
    provider: library,
    address,
  });
  const { contract, tokenId } = parseEnsAvatar(avatar);
  const image = useEnsPic({ contract, tokenId });

  React.useEffect(() => {
    (async () => {
      if (client) {
        if (loading) {
          try {
            const response = await detectFollowListChange(
              client,
              client.signedInEthAddress,
              followingList,
              10000
            );
            setFollowingList(response.following);
            setLoading(false);
          } catch (error) {
            console.error("Error detected", error);
            // no change detected after timeout,
            setLoading(false);
          }
        } else {
          const response = await loadFollowing(client);
          const { following } = response;
          setFollowingList(following);
        }
      }
    })();
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, [client, loading]);

  const handleFollowButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    console.log("button click with client", client);
    if (client) {
      follow(client, ethAddress);
      setLoading(true);
    }
  };

  const handleUnfollowClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (client) {
      unfollow(client, ethAddress);
      setLoading(true);
    }
  };

  return (
    <>
      <Grid md={24} justify="center" direction="column">
        <UserCard
          address={ethAddress}
          balance={balance}
          img={image}
          ens={ens}
          url={url}
          footerButton={
            (followingList ? followingList.includes(ethAddress) : false) ? (
              <Button
                icon={<Icon.UserX />}
                type="error"
                ghost
                w="100%"
                h="40px"
                shadow
                loading={loading || !ethAddress}
                onClick={handleUnfollowClick}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                icon={<Icon.UserPlus />}
                w="100%"
                h="40px"
                shadow
                loading={loading || !ethAddress}
                onClick={handleFollowButtonClick}
              >
                Follow
              </Button>
            )
          }
        />
      </Grid>
    </>
  );
}

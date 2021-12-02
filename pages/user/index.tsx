import { EnsUser } from "@/components/EnsUser";
import { LoadingUI } from "@/components/loading";
import { useCeramicContext } from "@/contexts/CeramicContext";
import { useBalance } from "@/hooks/useBalance";
import { fetcher } from "@/lib/fetcher";
import { Button, Card, Grid, Spacer } from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import * as React from "react";
import useSWR from "swr";
import {
  detectFollowListChange,
  follow,
  loadFollowing,
  unfollow,
} from "../../store/ceramicStore";

export default function Profile() {
  const web3Context = useWeb3React();
  const { library, chainId } = web3Context;
  const { client } = useCeramicContext();
  console.log(client);
  const router = useRouter();
  const { address } = router.query;
  const [mounted, setMounted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [followingList, setFollowingList] = React.useState();

  const [resolvedName, setResolvedName] = React.useState();

  const balance = useBalance({ account: `${address}`, library, chainId });

  const transactionsForAddress = useSWR(
    mounted ? `/api/address-txs/?address=${address}` : null,
    fetcher
  );

  const transactionsDetail = transactionsForAddress.data;
  const transactionsError = transactionsForAddress.error;

  const txsData = transactionsDetail?.data.items || [];

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
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'following' does not exist on type 'unkno... Remove this comment to see the full error message
          const { following } = response;
          const resolvedName = await library.resolveName(address);
          setFollowingList(following);
          setResolvedName(resolvedName);
        }
      }
    })();

    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, [client, loading]);

  const handleFollowButtonClick = async (e: any) => {
    e.preventDefault();
    console.log(
      "button click with client",
      client,
      "resolved address",
      address
    );

    if (client) {
      follow(client, resolvedName);
      setLoading(true);
    }
  };

  const handleUnfollowClick = async (event: any) => {
    event.preventDefault();
    console.log(
      "button click with client",
      client,
      "resolved address",
      address
    );

    if (client) {
      console.log(client);
      unfollow(client, resolvedName);
      setLoading(true);
    }
  };

  if (transactionsError) {
    return <div>Failed to load users</div>;
  }

  if (!client || !library) {
    return (
      <div>
        Loading... <LoadingUI />
      </div>
    );
  }

  if (!transactionsDetail || !client) {
    return (
      <div>
        Loading... <LoadingUI />
      </div>
    );
  }

  return (
    <Card>
      <EnsUser address={address} />

      <p>Ξ {balance}</p>
      <Spacer />
      <Spacer />
      <Grid md={24} justify="center">
        {(followingList ? followingList.includes(resolvedName) : false) ? (
          <Button
            icon={<Icon.UserX />}
            type="error"
            ghost
            w="305px"
            h="40px"
            shadow
            loading={loading || !resolvedName}
            onClick={handleUnfollowClick}
          >
            Unfollow
          </Button>
        ) : (
          <Button
            icon={<Icon.UserPlus />}
            w="305px"
            h="40px"
            shadow
            loading={loading || !resolvedName}
            onClick={handleFollowButtonClick}
          >
            Follow
          </Button>
        )}
      </Grid>
    </Card>
  );
}

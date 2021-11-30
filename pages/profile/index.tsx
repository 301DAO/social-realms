// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/components/FollowCard' or it... Remove this comment to see the full error message
import { FollowCard } from "@/components/FollowCard";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/components/loading' or its c... Remove this comment to see the full error message
import { LoadingUI } from "@/components/loading";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/components/nft-image' or its... Remove this comment to see the full error message
import NftImage from "@/components/nft-image";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/contexts/CeramicContext' or ... Remove this comment to see the full error message
import { useCeramicContext } from "@/contexts/CeramicContext";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/hooks/useEnsData' or its cor... Remove this comment to see the full error message
import { useEnsData } from "@/hooks/useEnsData";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/lib/fetcher' or its correspo... Remove this comment to see the full error message
import { fetcher } from "@/lib/fetcher";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/store/ceramicStore' or its c... Remove this comment to see the full error message
import { loadFollowing } from "@/store/ceramicStore";
import { Link, Note, Text } from "@geist-ui/react";
import { useWeb3React } from "@web3-react/core";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from "react";

export default function Profile() {
  const web3Context = useWeb3React();
  const { active, account, library } = web3Context;
  const { client } = useCeramicContext();
  const [loading, setLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [mounted, setMounted] = React.useState(false);
  const [portfolioValue, setPortfolioValue] = React.useState();

  const [following, setFollowing] = React.useState([]);
  const { ens, url, avatar } = useEnsData({
    provider: library,
    address: account,
  });
  const getPortfolioValue = async () => {
    const response = await fetcher(`/api/portfolio-value/?address=${account}`);
    setPortfolioValue(response);
  };

  React.useEffect(() => {
    (async () => {
      if (client) {
        const response = await loadFollowing(client);
        const { following } = response;
        setFollowing(following);
      }
    })();
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, [client, loading]);

  if (loading)
    return (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <div>
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        Loading... <LoadingUI />
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </div>
    );

  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div>
      {ens ? (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Text h1>{`Hi, ${ens}`}</Text>
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <NftImage avatar={avatar} />{" "}
        </>
      ) : (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Note>
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Text h5>
            You don&apos;t seem to have a primary ENS domain to serve as your
            web3 profile. Learn more{" "}
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Link color href="https://ens.domains/" target="_blank">
              here.
            </Link>
          </Text>
        </Note>
      )}
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <br />
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Text h1>Following</Text>
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <br />
      {following &&
        following.map((address: any) => {
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          return <FollowCard key={address} address={address} />;
        })}
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </div>
  );
}

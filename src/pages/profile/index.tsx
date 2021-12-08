import { FollowCard } from "@/components/FollowCard";
import { LoadingUI } from "@/components/loading";
import NftImage from "@/components/nft-image";
import { useCeramicContext } from "@/contexts/CeramicContext";
import { useEtherUser } from "@/hooks/useEtherUser";
import { fetcher } from "@/lib/fetcher";
import { loadFollowing } from "@/store/ceramicStore";
import { Link, Note, Text } from "@geist-ui/react";
import { useWeb3React } from "@web3-react/core";
import { Tabs } from "antd";
import * as React from "react";
const { TabPane } = Tabs;

function TabsComponent(): JSX.Element {
  return (
    <>
      <Tabs size="large" style={{ marginBottom: 32 }} type="card" centered>
        <TabPane tab="Tab 1" key="1" animated style={{ width: "100px" }}>
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </>
  );
}

export default function Profile() {
  const { active, account, library } = useWeb3React();
  const { client } = useCeramicContext();
  const [userData, setUserData] = React.useState({});
  const [mounted, setMounted] = React.useState(false);
  const [portfolioValue, setPortfolioValue] = React.useState();

  const [following, setFollowing] = React.useState([]);
  const { ens, url, avatar } = useEtherUser({
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
    return () => setMounted(false);
  }, [client]);

  if (!mounted)
    <>
      Loading... <LoadingUI />
    </>;

  return (
    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     width: "50vw",
    //   }}
    // >
    //   <TabsComponent />
    // </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {ens ? (
        <>
          <Text h1>{`Hi, ${ens}`}</Text>
          <NftImage avatar={avatar} />
        </>
      ) : (
        <Note>
          <Text h4>
            You don&apos;t seem to have a primary ENS domain to serve as your
            web3 profile. Learn more{" "}
            <Link color href="https://ens.domains/" target="_blank">
              here.
            </Link>
          </Text>
        </Note>
      )}

      <br />
      <Text h1>Following</Text>

      <br />
      {following &&
        following.map((address: any) => {
          return (
            <FollowCard key={address} address={address} provider={library} />
          );
        })}
    </div>
  );
}

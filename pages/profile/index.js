import { LoadingUI } from "@/components/loading";
import NftImage from "@/components/nft-image";
import ReadableTx from "@/components/readable-tx";
import { Card, Grid } from "@geist-ui/react";
import { useWeb3React } from "@web3-react/core";
import * as React from "react";
import useSWR from "swr";
import { useCeramicContext } from "../../contexts/CeramicContext";
import { useEnsData } from "../../hooks/useEnsData";
import { fetcher } from "../../lib/fetcher";

export default function Profile() {
  const web3Context = useWeb3React();

  const { active, account, library } = web3Context;
  const { client } = useCeramicContext();
  const [loading, setLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [mounted, setMounted] = React.useState(false);
  const [portfolioValue, setPortfolioValue] = React.useState();
  const queryParams = new URLSearchParams({ account });
  //const api_route = `/api/nft/account?${queryParams}`;
  const { data, error } = useSWR(
    mounted ? `/api/address-txs/?address=${account}` : null,
    fetcher
  );
  const txsData = data ? data.data.items : [];
  console.log(data);

  const { ens, url, avatar } = useEnsData({
    provider: library,
    address: account,
  });
  console.log(ens);

  React.useEffect(() => {
    setMounted(true);
    setLoading(true);
    const getPortfolioValue = async () => {
      const response = await fetcher(
        `/api/portfolio-value/?address=${account}`
      );
      setPortfolioValue(response);
    };
    getPortfolioValue();
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (error) return <div>Failed to load users</div>;
  if (!data || loading)
    return (
      <div>
        Loading... <LoadingUI />
      </div>
    );

  return (
    <Grid.Container gap={2} justify="center" height="100%" width="70%">
      <Grid xs={12}>
        <Grid.Container gap={2} justify="center" width="70%">
          <Grid xs={24}>
            <NftImage
              contract={userData?.avatar?.contractAddress}
              tokenId={userData?.avatar?.tokenId}
            />
          </Grid>
          <Grid xs={12}></Grid>
        </Grid.Container>
      </Grid>
      <Grid xs={12}>
        <Card shadow width="100%">
          <pre> {JSON.stringify(portfolioValue, null, 2)}</pre>
        </Card>
      </Grid>
      <Grid xs={24}>
        {/* TODO: map txsData to ReadableTx */}
        {JSON.stringify(data)}
        <ReadableTx datetime="" cost="" />
      </Grid>
      <Grid>placeholder</Grid>
    </Grid.Container>
  );
}

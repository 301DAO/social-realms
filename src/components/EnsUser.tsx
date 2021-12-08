import { useEtherUser } from "@/hooks/useEtherUser";
import { parseEnsAvatar } from "@/util/ens-avatar-parser";
import { User } from "@geist-ui/react";
import { useWeb3React } from "@web3-react/core";
import * as React from "react";
import { useQuery } from "react-query";

const getImage = async (contract: any, tokenId: any) => {
  const response = await fetch(
    `/api/nft-details/?contract=${contract}&token_id=${tokenId}`
  );
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const EnsUser = ({ address }: any) => {
  const { library } = useWeb3React();
  const { ens, url, avatar, ethAddress } = useEtherUser({
    provider: library,
    address,
  });
  const { contract, tokenId } = parseEnsAvatar(avatar);
  const { isLoading, error, data, isFetching } = useQuery(
    `nftImage-${tokenId}-${contract}`,
    async () => getImage(contract, tokenId)
  );
  const image = data?.nft?.metadata?.image;
  return (
    <>
      <User
        src={
          image ||
          "https://pbs.twimg.com/profile_images/1455381288756695041/acatxTm8_400x400.jpg"
        }
        name={ens || `${address?.substring(0, 8)}...`}
      >
        {url ? (
          <User.Link href={url}>{url}</User.Link>
        ) : (
          <User.Link href={`https://etherscan.io/address/${ethAddress}`}>
            {ethAddress}
          </User.Link>
        )}
      </User>
    </>
  );
};

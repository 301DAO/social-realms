// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/hooks/useEnsData' or its cor... Remove this comment to see the full error message
import { useEnsData } from "@/hooks/useEnsData";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/util/ens-avatar-parser' or i... Remove this comment to see the full error message
import { parseEnsAvatar } from "@/util/ens-avatar-parser";
import { User } from "@geist-ui/react";
import { useWeb3React } from "@web3-react/core";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from "react";
import { useQuery } from "react-query";

const getImage = async (contract: any, tokenId: any) => {
  const response = await fetch(
    `/api/nft-details/?contract_address=${contract}&token_id=${tokenId}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const EnsUser = ({
  address
}: any) => {
  const { library } = useWeb3React();

  const { ens, url, avatar, ethAddress } = useEnsData({
    provider: library,
    address,
  });

  const { contract, tokenId } = parseEnsAvatar(avatar);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoading, error, data, isFetching } = useQuery(
    `nftImage-${tokenId}-${contract}`,
    async () => getImage(contract, tokenId)
  );

  const image = data?.nft?.metadata?.image;

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <User
        src={
          image ||
          "https://pbs.twimg.com/profile_images/1455381288756695041/acatxTm8_400x400.jpg"
        }
        name={ens || `${address.substring(0, 8)}...`}
      >
        {url ? (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <User.Link href={url}>{url}</User.Link>
        ) : (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <User.Link href={`https://etherscan.io/address/${ethAddress}`}>
            {ethAddress}
          </User.Link>
        )}
      </User>
    </>
  );
};

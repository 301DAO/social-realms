//import { Image } from "@geist-ui/react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from "react";
import { Avatar } from "@geist-ui/react";
import { useQuery } from "react-query";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@/util/ens-avatar-parser' or i... Remove this comment to see the full error message
import { parseEnsAvatar } from "@/util/ens-avatar-parser";

const getImage = async (contract: any, tokenId: any) => {
  const response = await fetch(
    `/api/nft-details/?contract_address=${contract}&token_id=${tokenId}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
const placeholderImage = `https://external-preview.redd.it/
NADbWsobDS1wOTyi_AcFjYmfKmz6Oxyre1kFSD93Rts.jpg
?auto=webp&s=832a2557421e6f81fb6dfd0110d652941b9de6c6`;

export default function NftImage({
  avatar,
  isProfilePic
}: any) {
  if (!avatar)
    return isProfilePic ? (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Avatar src={placeholderImage} scale={2} />
    ) : (
      // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <img src={placeholderImage} />
    );
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
      {isProfilePic ? (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Avatar src={image} scale={2} />
      ) : (
        // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <img
          src={image}
          style={{
            height: "150px",
            width: "150px",
            // objectFit: "cover",
          }}
        />
      )}
    </>
  );
}

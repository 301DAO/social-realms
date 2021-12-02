//import { Image } from "@geist-ui/react";
import { parseEnsAvatar } from "@/util/ens-avatar-parser";
import { Avatar } from "@geist-ui/react";
import Image from "next/image";
import * as React from "react";
import { useQuery } from "react-query";

const getImage = async (contract: string, tokenId: string) => {
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

type NftImageProps = {
  avatar: string;
  isProfilePic: boolean;
};

export default function NftImage({ avatar, isProfilePic }: NftImageProps) {
  if (!avatar)
    return isProfilePic ? (
      <Avatar src={placeholderImage} scale={2} />
    ) : (
      <Image src={placeholderImage} />
    );
  const { contract, tokenId } = parseEnsAvatar(avatar);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoading, error, data, isFetching } = useQuery(
    `nftImage-${tokenId}-${contract}`,
    async () => getImage(contract, tokenId)
  );

  const image = data?.nft?.metadata?.image;

  return (
    <>
      {isProfilePic ? (
        <Avatar src={image} scale={2} />
      ) : (
        <Image src={image} height="150px" width="150px" />
      )}
    </>
  );
}

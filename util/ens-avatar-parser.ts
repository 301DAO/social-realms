export const parseEnsAvatar = (avatarAddress: any) => {
  if (!avatarAddress) return { contract: "", tokenId: 0 };
  const [type, address, tokenId] = avatarAddress.split("/");
  const [chainId, ensAddress, ensTokenId] = address.split(":");

  return {
    type,
    contract: ensAddress,
    tokenId: ensTokenId || tokenId,
    chainId: chainId || "1",
  };
};

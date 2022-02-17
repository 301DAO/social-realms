import axios from 'axios';

const KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY || '';
const BASE_URL = `https://eth-mainnet.g.alchemy.com/${KEY}/v1`;

type Attribute = { value: string; trait_type: string };
type Metadata = { image: string; attributes: Attribute[] };
type Uri = { gateway: string; raw: string };
type Contract = { address: string };
type Id = { id: string };

export type AddressNFT = {
  contract: Contract;
  id: Id;
  balance: string;
};

export type AddressNFTsResponse = {
  ownedNfts: AddressNFT[];
  blockHash: string;
  pageKey: string;
  totalCount: number;
};

type NFTMetadata = {
  contract: Contract;
  description: string;
  id: Id;
  media: Uri[];
  metadata: Metadata;
  timeLastUpdated: string;
  title: string;
  tokenUri: Uri;
};

type NFTMetadataRequest = {
  contractAddress: string;
  tokenId: string;
  tokenType?: string;
};

export const nftMetadata = async ({
  contractAddress,
  tokenId,
  tokenType = 'ERC721',
}: NFTMetadataRequest): Promise<NFTMetadata | null> => {
  const queryParams = new URLSearchParams({
    contractAddress,
    tokenId,
    tokenType,
  });
  
  try {
    const { data } = await axios.get(`${BASE_URL}/getNFTMetadata?` + queryParams.toString());
    return data;
  } catch (error) {
    console.log('Error in nftMetadata.ts: ', error instanceof Error ? error.message : error);
  }
  return null;
};

export const addressNFTs = async (address: string) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/getNFTs/?owner=${address}`);
    return data;
  } catch (error) {
    console.log(
      'Error in alchemy/addressNFTs.ts: ',
      error instanceof Error ? error.message : error
    );
  }
  return null;
};

export const paginatedAddressNFTs = async ({
  address,
  pageKey,
}: {
  address: string;
  pageKey?: string;
}) => {
  try {
    const url = `${BASE_URL}/getNFTs/?owner=${address}` + (pageKey ? `&pageKey=${pageKey}` : '');
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log(
      'Error in alchemy/paginatedAddressNFTs.ts: ',
      error instanceof Error ? error.message : error
    );
  }
  return null;
};

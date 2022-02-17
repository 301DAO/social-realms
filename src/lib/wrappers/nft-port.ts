import axios from 'axios';

import { NFT, RetrieveNFTDetails } from '@/types';

// Docs: https://docs.nftport.xyz/docs
const API_KEY = process.env.NEXT_PUBLIC_NFT_PORT_KEY;
const NFT_PORT_ENDPOINT = 'https://api.nftport.xyz/v0';

const NftPortRequest = async (relativePath: string) => {
  try {
    const url = `${NFT_PORT_ENDPOINT}/${relativePath}`;
    const response = await axios.get(url, { headers: { Authorization: `${API_KEY}` } });
    return response.data;
  } catch (error) {
    console.error(`Error in NftPortRequest: `, error instanceof Error ? error.message : error);
  }

  return {
    success: false,
    message: 'error in NftPortRequest',
  };
};

/**
 * Returns details for a given NFT. These include metadata_url, metadata such as name, description, attributes, etc., image_url, cached_image_url and mint_date.
 */
export const retrieveNftDetails = async (
  contract: string,
  tokenId: string
): Promise<RetrieveNFTDetails> => {
  const relativePath = `nfts/${contract}/${tokenId}?chain=ethereum`;
  return await NftPortRequest(relativePath);
};

/**
 * Returns NFTs owned by a given account (i.e. wallet) address. Can also return each NFT metadata with 'include' parameter.
 */
export const retrieveNftsByAddress = async ({
  address,
  continuationToken,
  limit,
}: {
  address: string;
  continuationToken?: string;
  limit?: number;
}): Promise<{
  continuation: string;
  nfts: NFT[];
  response: string;
  total: number | null;
}> => {
  const continuation = continuationToken ? `&continuation=${continuationToken}` : '';
  const page_size = limit ?? 12;
  const relativePath = `accounts/${address}?chain=ethereum&include=metadata&page_size=${page_size}${continuation}`;
  return await NftPortRequest(relativePath);
};

export const retrieveCollectionSaleStats = async (
  contract: string
): Promise<{
  response: string;
  statistics: {
    one_day_volume: number;
    one_day_change: number;
    one_day_sales: number;
    one_day_average_price: number;
    seven_day_volume: number;
    seven_day_change: number;
    seven_day_sales: number;
    seven_day_average_price: number;
    thirty_day_volume: number;
    thirty_day_change: number;
    thirty_day_sales: number;
    thirty_day_average_price: number;
    total_volume: number;
    total_sales: number;
    total_supply: number;
    total_minted: number;
    num_owners: number;
    average_price: number;
    market_cap: number;
    floor_price: number;
  };
}> => {
  const relativePath = `transactions/stats/${contract}?chain=ethereum`;
  return NftPortRequest(relativePath);
};

import axios from 'axios';

import type {
  NFTMetadata,
  NFTMetadataRequest,
  AlchemyGetBlockReceiptsRequest,
  AlchemyGetBlockReceiptsResponse,
  AlchemyBlockNumberResponse,
  AlchemyGetAssetTransfersResponse,
  AlchemyGetAssetTransfersRequest,
} from './alchemy.types';

import { AssetTransfersCategory } from '@alch/alchemy-web3';

import { to32BytesHash } from '@/utils';

//const KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY;

const KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
const URL = `https://eth-mainnet.alchemyapi.io/v2/${KEY}`;
const BASE_URL = `https://eth-mainnet.g.alchemy.com/${KEY}/v1`;

export interface AlchemyRequest {
  id?: number;
  method: string;
  params: string | string[] | any[];
}
async function alchemyRequest<T>({ id = 0, method, params }: AlchemyRequest) {
  const response = await axios.post<Promise<T>>(URL, {
    jsonrpc: '2.0',
    id,
    method,
    params,
  });
  return response;
}

export async function alchemyGetAssetTransfers({
  fromBlock = 1,
  toBlock = 'latest',
  fromAddress,
  toAddress,
  contractAddresses = [],
  maxCount = 5,
  pageKey,
  excludeZeroValues = true,
  category = Object.values(AssetTransfersCategory),
}: AlchemyGetAssetTransfersRequest) {
  const requestParams = {
    fromBlock: to32BytesHash(fromBlock as number),
    toBlock: typeof toBlock === 'string' ? toBlock : to32BytesHash(toBlock as number),
    maxCount: to32BytesHash(maxCount as number),
    fromAddress,
    toAddress,
    pageKey,
    category,
    contractAddresses,
    excludeZeroValues,
  };
  const { data, status } = await alchemyRequest<AlchemyGetAssetTransfersResponse>({
    method: 'alchemy_getAssetTransfers',
    params: [JSON.parse(JSON.stringify(requestParams))],
  });
  if (status !== 200) return Promise.reject('Error fetching asset transfers');
  return data;
}

export async function alchemyGetBlockReceipts({
  blockNumberOrHash = 'latest',
}: AlchemyGetBlockReceiptsRequest = {}): Promise<AlchemyGetBlockReceiptsResponse> {
  const { data, status } = await alchemyRequest<AlchemyGetBlockReceiptsResponse>({
    method: 'eth_getBlockReceipts',
    params: [blockNumberOrHash],
  });
  if (status !== 200) return Promise.reject('eth_getBlockReceipts F');
  return data;
}

/** returns block number hash, so do Number(blockNumber) */
export async function alchemyBlockNumber(): Promise<AlchemyBlockNumberResponse> {
  const { data, status } = await alchemyRequest<AlchemyBlockNumberResponse>({
    method: 'eth_blockNumber',
    params: [],
  });
  if (status !== 200) return Promise.reject('eth_blockNumber F');
  return data;
}

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

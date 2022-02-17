import axios from 'axios';

// Docs: https://docs.nftport.xyz/docs
const API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN || '';
const ENDPOINT = `https://api.etherscan.io/api`;

const EtherscanRequest = async (queryParams: any) => {
  const searchParams = new URLSearchParams({
    ...queryParams,
    apikey: API_KEY,
  });
  const url = new URL(ENDPOINT + '?' + searchParams);
  try {
    const response = await axios.get(url.toString());
    return response.data;
  } catch (error: unknown) {
    console.error(`Error in EtherscanRequest: `, error instanceof Error ? error.message : error);
  }
  return {
    success: false,
    message: 'error in EtherscanRequest',
  };
};

export const getInternalTransactions = async ({
  startBlock,
  endBlock,
  address,
  page = 1,
  offset = 10,
  sort = 'asc',
}: {
  startBlock: number;
  endBlock: number;
  address: string;
  page?: number;
  offset?: number;
  sort?: 'asc' | 'desc';
}): Promise<any> => {
  const queryParams = {
    module: 'account',
    action: 'txlistinternal',
    startblock: `${startBlock}`,
    endblock: `${endBlock}`,
    address,
    page: `${page}`,
    offset: `${offset}`,
    sort,
  };
  return await EtherscanRequest(queryParams);
};

export const getTransactions = async ({
  startBlock,
  endBlock,
  address,
  page = 1,
  offset = 10,
  sort = 'asc',
}: {
  startBlock: number;
  endBlock: number;
  address: string;
  page?: number;
  offset?: number;
  sort?: 'asc' | 'desc';
}): Promise<any> => {
  const queryParams = {
    module: 'account',
    action: 'txlist',
    address,
    startblock: `${startBlock}`,
    endblock: `${endBlock}`,
    page: `${page}`,
    offset: `${offset}`,
    sort,
  };
  return await EtherscanRequest(queryParams);
};

export const hashToTransaction = async (hash: string): Promise<any> => {
  const queryParams = {
    module: 'account',
    action: 'txlistinternal',
    txhash: hash,
  };
  return await EtherscanRequest(queryParams);
};

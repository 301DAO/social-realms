import { base64Encode } from '@/utils';
import { utils } from 'ethers';
import axios from 'axios';

const COVALENT_ENDPOINT = 'https://api.covalenthq.com/v1';
const COVALENT_API_KEY = process.env.NEXT_PUBLIC_COVALENT_API_KEY || '';
// Ethereum's chain ID
const CHAIN_ID = 1;

const CovalentRequest = async (relativePath: string) => {
  const url = `${COVALENT_ENDPOINT}/${CHAIN_ID}/${relativePath}`;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Basic ${base64Encode(COVALENT_API_KEY)}` },
    });
    return response.data;
  } catch (error: unknown) {
    console.error(`Error in CovalentRequest: `, error instanceof Error ? error.message : error);
  }

  return {
    success: false,
    message: 'error in CovalentRequest',
  };
};

/**
 * retrieve past transactions for a given address
 * @param address accepts ethereum address or ENS name
 * @param limit number of transactions to return, default is 0 which means no limit
 */
export const getTransactionsForAddress = async ({
  address,
  limit = 1,
}: {
  address: string;
  limit?: number;
}) => {
  const _address = utils.getAddress(address);
  const relativePath = `address/${_address}/transactions_v2/?limit=${limit}`;
  return await CovalentRequest(relativePath);
};

/**
 * retrieve transaction logs given a transaction hash
 * @param hash: transaction hash
 */
export const getTransaction = async (hash: string) => {
  const relativePath = `transactions_v2/${hash}`;
  return await CovalentRequest(relativePath);
};

export const getHistoricalPortfolioValue = async (address: string) => {
  const relativePath = `address/${address}/portfolio_v2/`;
  return CovalentRequest(relativePath);
};

/**
 * retrieve past transactions for a given address
 * @param address accepts ethereum address or ENS name
 * @param limit number of transactions to return, default is 0 which means no limit
 * @param contractAddress smart contract address
 */
export const getERC20tokenTransfersForAddress = async ({
  address,
  limit = 0,
  contractAddress,
}: {
  address: string;
  limit?: number;
  contractAddress?: string;
}) => {
  const relativePath = `address/${address}/transfers_v2/?contract-address=${contractAddress}&limit=${limit}`;
  return CovalentRequest(relativePath);
};

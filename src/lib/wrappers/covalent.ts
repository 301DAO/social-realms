import axios from 'axios';
import { utils } from 'ethers';
import { KEY, URL, CHAINS } from './covalent.constants';
import type {
  CovalentRequest,
  CovalentBaseRequest,
  PortfolioValueRequest,
  PortfolioValueResponse,
  NftMarketGlobalViewRequest,
  NftMarketGlobalViewResponse,
  AddressTokenBalancesRequest,
  AddressTokenBalancesResponse,
  CovalentGetTxsForAddressRequest,
  CovalentGetTxsForAddressResponse,
} from './covalent.types';

// those can be overwritten in any of the requests
const defaultParams: CovalentBaseRequest = {
  'quote-currency': 'USD',
  format: 'JSON',
};

/**
 * * Docs: https://www.covalenthq.com/docs/api/#/0/0/USD/1
 */
async function covalentRequest<T>({ relativePath, params = defaultParams }: CovalentRequest) {
  params['key'] = KEY;
  const url = `${URL}/${relativePath}/?`;
  return await axios.get<Promise<T>>(url, { params });
}

/**
 * * Docs: https://www.covalenthq.com/docs/api/#/0/Get%20transactions%20for%20address/USD/1
 * retrieve past transactions for a given address
 */
export const covalentGetTxsForAddress = async ({
  address,
  'block-signed-at-asc': blockSignedAtAsc = false,
  'no-logs': noLogs = false,
  'page-number': pageNumber = undefined,
  'page-size': pageSize = undefined,
  chain_id = CHAINS.ETHEREUM,
}: CovalentGetTxsForAddressRequest): Promise<CovalentGetTxsForAddressResponse> => {
  const _address = utils.getAddress(address);
  const relativePath = `${chain_id}/address/${_address}/transactions_v2`;
  const params = {
    'block-signed-at-asc': blockSignedAtAsc,
    'no-logs': noLogs,
    'page-number': pageNumber,
    'page-size': pageSize,
  };

  const response = await covalentRequest<CovalentGetTxsForAddressResponse>({
    relativePath,
    params: JSON.parse(JSON.stringify(params)),
  });
  return response.data;
};

/**
 * * Docs: https://www.covalenthq.com/docs/api/#/0/Get%20token%20balances%20for%20address/USD/1
 * @param address ethereum, ENS name, or solana address.
 *
 * - NOTE: using ENS name slows down the request by a lot
 * @param chain 'ETHEREUM' or 'SOLANA, default is 'ETHEREUM'
 *
 * ```ts
 * covalentTokenBalances({
 *    address: 'brantly.eth',
 *    includeNft: true,
 *    includeNftMetadata: true,
 * }).then(_ => console.log(JSON.stringify(_, null, 2)));
 * ```
 */
export async function covalentTokenBalances({
  address,
  includeNft,
  includeNftMetadata,
}: AddressTokenBalancesRequest): Promise<AddressTokenBalancesResponse> {
  const queryParams = {
    nft: includeNft.toString(),
    'no-nft-fetch': (!includeNftMetadata).toString(), // inverted
  };

  const relativePath = `address/${address}/balances_v2`;
  const { data } = await covalentRequest<AddressTokenBalancesResponse>({
    relativePath,
    params: queryParams,
  });

  if (!data) {
    throw new Error('Error while fetching covalent token balances');
  }
  return data;
}

/**
 ** Docs: https://www.covalenthq.com/docs/api/#/0/Get%20token%20balances%20for%20address/USD/1
 *
 * * All params are optional
 * if @params from and to must both be included or both be omitted
 * @param dateRange
 *      - from The start day of the historical market data. (YYYY-MM-DD)
 *
 *      - to The start day of the historical market data. (YYYY-MM-DD)
 * @param pageNumber The specific page to be returned.
 * @param pageSize The number of items to be returned per page.
 *
 * * Example:
 * ```ts
 • nftMarketGlobalView({
 *   pageNumber: 0,
 *   pageSize: 2,
 * }).then(console.log);
 * ```
 */
// export async function covalentNftMarketGlobalView({
//   dateRange,
//   pageNumber,
//   pageSize,
// }: NftMarketGlobalViewRequest = {}): Promise<NftMarketGlobalViewResponse> {
//   const queryParams = {
//     from: dateRange?.from,
//     to: dateRange?.to,
//     'page-number': pageNumber,
//     'page-size': pageSize,
//   };

//   const relativePath = `nft_market`;
//   const { data } = await covalentRequest<NftMarketGlobalViewResponse>({
//     relativePath,
//     // parse then stringify to remove undefined values
//     params: JSON.parse(JSON.stringify(queryParams)),
//   });
//   if (!data) {
//     throw new Error('Error while fetching covalent nft market global view');
//   }
//   return data;
// }

/**
 **https://www.covalenthq.com/docs/api/#/0/Get%20historical%20portfolio%20value%20over%20time/USD/1
 * * Example:
 * ```ts
 * getPortfolioValue({ address: '0x0F4ee9631f4be0a63756515141281A3E2B293Bbe' }).then(console.log);
 * ```
 */

export async function covalentGetPortfolioValue({
  address,
}: PortfolioValueRequest): Promise<PortfolioValueResponse> {
  const relativePath = `address/${address}/portfolio_v2`;
  const { data } = await covalentRequest<PortfolioValueResponse>({ relativePath });
  if (!data) {
    throw new Error('Error while fetching covalent portfolio value');
  }
  return data;
}

/**
 * retrieve transaction logs given a transaction hash
 * @param hash: transaction hash
 */
export const getTransaction = async (hash: string) => {
  const relativePath = `transactions_v2/${hash}`;
  return await covalentRequest({ relativePath });
};

export const getHistoricalPortfolioValue = async (address: string) => {
  const relativePath = `address/${address}/portfolio_v2/`;
  return covalentRequest({ relativePath });
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
  return covalentRequest({ relativePath });
};

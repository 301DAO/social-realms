interface AlchemyBaseResponse {
  jsonrpc: '2.0';
  id: 0;
  error?: AlchemyErrorResponse;
}

interface AlchemyErrorResponse {
  error: { code: number; message: string };
}

import type { AssetTransfersCategory } from '@alch/alchemy-web3';
export interface AlchemyGetAssetTransfersRequest {
  fromBlock?: string | number;
  toBlock?: string | number;
  fromAddress?: string;
  toAddress?: string;
  contractAddresses?: Array<string>;
  maxCount?: string | number;
  pageKey?: string;
  excludeZeroValues?: boolean;
  category?: AssetTransfersCategory[];
}

export interface AlchemyBlockNumberResponse extends AlchemyBaseResponse {
  result: string;
}

export interface AlchemyGetBlockReceiptsRequest {
  blockNumberOrHash?: string | number;
}
export interface AlchemyGetBlockReceiptsResponse extends AlchemyBaseResponse {
  blockHash: string;
  blockNumber: string;
  contractAddress: null;
  cumulativeGasUsed: string;
  effectiveGasPrice: string;
  from: string;
  gasUsed: string;
  logs: Log[];
  logsBloom: string;
  status: string;
  to: string;
  transactionHash: string;
  transactionIndex: string;
  type: string;
}

interface Log {
  address: string;
  topics: string[];
  data: string;
  blockNumber: string;
  transactionHash: string;
  transactionIndex: string;
  blockHash: string;
  logIndex: string;
  removed: boolean;
}

export interface AlchemyGetAssetTransfersResponse extends AlchemyBaseResponse {
  result: Result;
}

interface Result {
  transfers: Transfer[];
  pageKey: string;
}

export interface Transfer {
  blockNum: string;
  hash: string;
  from: string;
  to: string;
  value: number;
  erc721TokenId: null;
  erc1155Metadata: null;
  tokenId: null;
  asset: string;
  category: string;
  rawContract: RawContract;
}

interface RawContract {
  value: string;
  address: string;
  decimal: string;
}

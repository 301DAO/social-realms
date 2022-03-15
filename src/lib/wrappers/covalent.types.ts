import { CHAINS } from './covalent.constants';

export interface CovalentRequest {
  relativePath: string;
  params?: any;
}

export interface CovalentBaseRequest {
  chain_id?: Chain;
  format?: 'JSON' | 'CSV';
  'quote-currency'?: QuoteCurrency;
}

interface CovalentBaseResponse {
  error: boolean;
  error_message: string | null;
  error_code: number | null;
}

// covalentGetTxsForAddress()
export interface CovalentGetTxsForAddressRequest extends CovalentBaseRequest {
  address: string;
  'block-signed-at-asc'?: boolean;
  'no-logs'?: boolean;
  'page-number'?: number;
  'page-size'?: number;
}

export interface CovalentGetTxsForAddressResponse extends CovalentBaseResponse {
  data?: Data;
}

// covalentTokenBalances()
export interface AddressTokenBalancesRequest {
  address: string;
  includeNft: boolean;
  includeNftMetadata: boolean;
  quoteCurrency?: QuoteCurrency;
  chain?: Chain;
}

export interface AddressTokenBalancesResponse extends CovalentBaseResponse {
  data?: {
    address: string;
    updated_at: Date;
    next_update_at: Date;
    quote_currency: QuoteCurrency;
    chain_id: number;
    items: Item[];
    pagination: null;
  };
}

type Type = 'cryptocurrency' | 'dust' | 'nft';

// NftMarketGlobalView()
export interface NftMarketGlobalViewRequest {
  dateRange?: DateRange;
  pageNumber?: number;
  pageSize?: number;
}

type DateRange = {
  from: string;
  to: string;
};

export interface NftMarketGlobalViewResponse extends CovalentBaseResponse {
  data: Data;
}

// getPortfolioValue()
export interface PortfolioValueRequest {
  address: string;
  quoteCurrency?: QuoteCurrency;
  chain?: Chain;
}

export interface PortfolioValueResponse extends CovalentBaseResponse {
  data: Data;
}

export interface PortfolioItem {
  contract_decimals: number;
  contract_name: string;
  contract_ticker_symbol: string;
  contract_address: string;
  supports_erc: null;
  logo_url: string;
  holdings: Holding[];
}

interface Data {
  address: string;
  updated_at: Date;
  next_update_at: Date;
  quote_currency: QuoteCurrency;
  chain_id: number;
  items: PortfolioItem[];
  pagination: null;
}

interface Holding {
  timestamp: string;
  quote_rate: number;
  open: Close;
  high: Close;
  low: Close;
  close: Close;
}

interface Close {
  balance: string;
  quote: number;
}

// SHARED
type Item = {
  contract_decimals: number;
  contract_name: null | string;
  contract_ticker_symbol: null | string;
  contract_address: string;
  supports_erc: string[];
  logo_url: string;
  last_transferred_at: Date | null;
  type: Type;
  balance: string;
  balance_24h: null;
  quote_rate: number | null;
  quote_rate_24h: number | null;
  quote: number;
  quote_24h: null;
  nft_data: null;
};

type Chain = typeof CHAINS[keyof typeof CHAINS];
//'ETHEREUM' | 'SOLANA';

type QuoteCurrency =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'CNY'
  | 'JPY'
  | 'KRW'
  | 'BTC'
  | 'ETH'
  | 'LTC'
  | 'SOL'
  | 'LUNA'
  | 'USDC'
  | 'UST'
  | 'USDT'
  | 'DAI';

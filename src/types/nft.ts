export interface RetrieveNFTDetails {
  response: string;
  nft: NFT;
  contract: Contract;
}
export interface NFT {
  chain: string;
  contract_address: string;
  token_id: string;
  name: string;
  description: string;
  creator_address: string;
  metadata_url: string;
  metadata: Metadata;
  file_information: FileInformation;
  file_url: string;
  cached_file_url: string;
  mint_date: string;
  updated_date: string;
}
export interface Metadata {
  attributes?: AttributesEntity[] | null;
  image: string;
}
export interface AttributesEntity {
  trait_type: string;
  value: string;
}
export interface FileInformation {
  height: number;
  width: number;
  file_size: number;
}
export interface Contract {
  name: string;
  symbol: string;
  type: string;
}

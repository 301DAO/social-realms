export interface EnsSubgraphResponse {
  data: Data;
}
export interface Data {
  nameQuery: Domain[];
  addressQuery: Domain[];
}

export interface Domain {
  name: string;
  resolvedAddress: ResolvedAddress;
  resolver: Resolver;
}

interface ResolvedAddress {
  id: string;
}

interface Resolver {
  contentHash: string;
  texts: string[];
}

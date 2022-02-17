import axios from 'axios';

import type { EnsSubgraphResponse } from '@/types';

const GRAPH_ENS_ENDPOINT = `https://api.thegraph.com/subgraphs/name/ensdomains/ens`;

const query = `
  query EnsQuery($name: String, $address: String) {
    nameQuery: domains(where: {name: $name}) {
      name
      resolvedAddress { id }
    }
    addressQuery: domains(where: {resolvedAddress: $address}, first: 1) {
      name
      resolvedAddress { id }
    }
  }
`;

/**
 * It will query the subgraph when you pass it an ens name or an address
 * if you pass an ens name it will return the address and the name
 * if you pass an address it will return the name and the address
 * you can pass it either one and leave the other one empty
 */
export const queryEnsSubgraph = async ({
  name,
  address,
}: {
  name?: string;
  address?: string;
}): Promise<EnsSubgraphResponse | null> => {
  try {
    const variables = { address: address?.toLowerCase(), name: name?.toLowerCase() };

    const response = await axios.post(GRAPH_ENS_ENDPOINT, { query, variables });
    return response.data;
  } catch (error: unknown) {
    console.error(`error in queryEnsSubgraph: `, error instanceof Error ? error.message : error);
  }
  return null;
};

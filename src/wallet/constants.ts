interface Chain {
  rpcUrl?: string
  chainId: string
  networkId: number
}

// TODO: https://docs.metamask.io/guide/ethereum-provider.html#chain-ids

export const networks: {
  [key: string]: Chain
} = {
  ethereum: {
    networkId: 1,
    chainId: '0x1',
    rpcUrl: 'https://mainnet.infura.io/ocCdekUYwOyLn7h7OlJM',
  },
  bsc: {
    networkId: 56,
    chainId: '0x38',
    rpcUrl: 'https://bsc-dataseed.binance.org',
  },
  avalanche: {
    networkId: 43114,
    chainId: '0xa86a',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
  },
  polygon: {
    networkId: 137,
    chainId: '',
    rpcUrl:
      'https://polygon-mainnet.infura.io/v3/0ebf4dd05d6740f482938b8a80860d13',
  },
}

import { Connector, chain, defaultChains, defaultL2Chains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { providers } from 'ethers';

const alchemy = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
const etherscan = process.env.NEXT_PUBLIC_ETHERSCAN_KEY;
const infuraId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;

export const defaultProvider = new providers.InfuraProvider(undefined, infuraId);

// Pick chains
const chains = defaultChains;
const defaultChain = chain.mainnet;

// Set up connectors
type ConnectorsConfig = { chainId?: number };
export const connectors = ({ chainId }: ConnectorsConfig) => {
  const rpcUrl = chains.find(x => x.id === chainId)?.rpcUrls?.[0] ?? defaultChain.rpcUrls[0];
  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        infuraId,
        qrcode: true,
      },
    }),
  ];
};

// Set up providers
type ProviderConfig = { chainId?: number; connector?: Connector };
const isChainSupported = (chainId?: number) => chains.some(x => x.id === chainId);

// Set up providers
export const provider = ({ chainId }: ProviderConfig) =>
  providers.getDefaultProvider(isChainSupported(chainId) ? chainId : defaultChain.id, {
    alchemy,
    etherscan,
    infuraId,
  });
export const webSocketProvider = ({ chainId }: ConnectorsConfig) =>
  isChainSupported(chainId) ? new providers.InfuraWebSocketProvider(chainId, infuraId) : undefined;

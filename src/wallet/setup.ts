import { Connector, chain, defaultChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { providers } from 'ethers';

const alchemy = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
const etherscan = process.env.NEXT_PUBLIC_ETHERSCAN_KEY;
const infuraId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;

export const defaultProvider = new providers.InfuraProvider(undefined, infuraId);

// Set up connectors
type ConnectorsConfig = { chainId?: number };

export const connectors = [
  new InjectedConnector({
    chains: defaultChains,
    options: { shimDisconnect: false },
  }),
  new WalletConnectConnector({
    chains: defaultChains,
    options: { infuraId, qrcode: true },
  }),
];

// Set up providers
type ProviderConfig = { chainId?: number; connector?: Connector };

const isChainSupported = (chainId?: number) => defaultChains.some(x => x.id === chainId);

export const wagmiProvider = ({ chainId = 1 }: ProviderConfig = {}) =>
  new providers.AlchemyProvider(chainId, alchemy) ||
  new providers.InfuraProvider(chainId, infuraId) ||
  new providers.EtherscanProvider(chainId, etherscan) ||
  new providers.FallbackProvider([defaultProvider]) ||
  new providers.CloudflareProvider();

export const wagmiWebSocketProvider = ({ chainId = 1 }: ProviderConfig = {}) =>
  new providers.AlchemyWebSocketProvider(chainId, alchemy) ||
  new providers.InfuraWebSocketProvider(chainId, infuraId) ||
  new providers.WebSocketProvider('homestead');

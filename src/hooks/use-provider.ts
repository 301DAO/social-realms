import { providers } from 'ethers';
import { hasMetaMask } from '@/utils';

export const useJsonRpcProvider = () =>
  new providers.JsonRpcProvider({
    url: process.env.NEXT_PUBLIC_ALCHEMY,
    throttleLimit: 10000000,
  });

export const useWssJsonRpcProvider = () =>
  new providers.InfuraWebSocketProvider(undefined, process.env.NEXT_PUBLIC_ALCHEMY_KEY);

export const useInjectedProvider = () =>
  hasMetaMask
    ? new providers.Web3Provider(window.ethereum as any)
    : new providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY);

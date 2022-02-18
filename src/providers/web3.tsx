import { connectors, webSocketProvider, provider } from '@/wallet';
import * as React from 'react';
import { Provider } from 'wagmi';
import { useUser } from '@/hooks';

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const { authenticated } = useUser();

  // TODO: add nice spinner / loader when loading
  if (typeof authenticated === 'undefined') {
    return <div>LOADING . . .</div>;
  }

  return (
    <Provider
      autoConnect={authenticated}
      connectors={connectors}
      provider={provider}
      webSocketProvider={webSocketProvider}
    >
      {children}
    </Provider>
  );
};

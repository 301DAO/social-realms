import * as React from 'react';
import { Provider } from 'wagmi';
import { useUser } from '@/hooks';
import { FullPageLoadingSpinner } from '@/components';
import { connectors, wagmiWebSocketProvider, wagmiProvider } from '@/wallet';

export const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
  const { authenticated, status } = useUser();

  if (status !== 'success') return <FullPageLoadingSpinner />;

  return (
    <Provider
      autoConnect={authenticated}
      connectors={connectors}
      provider={wagmiProvider}
      webSocketProvider={wagmiWebSocketProvider}
      connectorStorageKey={`${Date.now()}`}>
      {children}
    </Provider>
  );
};

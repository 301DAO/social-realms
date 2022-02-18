import * as React from 'react';

export const switchNetworkToast = () =>
  import('react-hot-toast').then(_ =>
    _.toast(
      <p id="switch-network-toast">
        Your wallet is not connected. Make sure its connected and the network is set to Ethereum
        mainnet
      </p>,
      {
        position: 'bottom-right',
        style: {
          background: '#f44336',
          color: '#fff',
        },
        duration: 30000000,
      }
    )
  );

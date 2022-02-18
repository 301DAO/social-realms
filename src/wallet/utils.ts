import { utils } from 'ethers';
import { defaultProvider } from '@/wallet';

const ETHEREUM_CHAIN_ID = '0x1';

const addEthereumChain = async () => {
  if (typeof window.ethereum === 'undefined') return;
  return await window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: ETHEREUM_CHAIN_ID,
        chainName: 'Ethereum',
        rpcUrls: [`https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`],
      },
    ],
  });
};

export const switchNetwork = async (chainId: string) => {
  if (typeof window.ethereum === 'undefined') return;
  try {
    return await window?.ethereum?.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
  } catch (error) {
    if ((error as any).code !== 4902) return;
    await addEthereumChain();
  }
  return false;
};

export const switchOnChainChange = async ({
  switchToChainId,
  onChainChange,
  onChainChangeSettled,
}: {
  switchToChainId: string;
  onChainChange: () => Promise<string>;
  onChainChangeSettled: () => Promise<void>;
}) => {
  if (typeof window.ethereum?.on === 'undefined') return;

  return window.ethereum.on('chainChanged', (chainId: string) => {
    console.log(`chain changed to ${chainId}`);

    if (chainId !== switchToChainId) {
      switchNetwork(switchToChainId);
      onChainChange();
      // import('@/components/switch-network-toast').then(({ switchNetworkToast }) => {
      //   switchNetworkToast();
      // });
    } else {
      onChainChangeSettled();
      // import('react-hot-toast').then(({ default: toast }) => {
      //   toast.remove();
      // });
    }
  });
};

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return utils.getAddress(value);
  } catch {
    return false;
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress({
  address,
  chars = 4,
}: {
  address: string;
  chars?: number;
}): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid address parameter: ${address}.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

// checksum address
export const checksumAddress = (address: string) => {
  try {
    return utils.getAddress(address.toLowerCase());
  } catch {
    return false;
  }
};

/**
 * by default it switches to Ethereum. Update parameters for bsc or add more chainIds and rpcUrls for other networks.
 * chainid has to be a hex string
 */

// const addEthereumChain = async () => {
//   if (typeof window.ethereum === 'undefined') return;
//   return await window.ethereum.request({
//     method: 'wallet_addEthereumChain',
//     params: [
//       {
//         chainId: networks.ethereum.chainId,
//         //@ts-ignore
//         rpcUrl: networks.ethereum.rpcUrl,
//       },
//     ],
//   });
// };

// export const switchNetwork = async () => {
//   if (typeof window.ethereum === 'undefined') return;
//   try {
//     await window?.ethereum?.request({
//       method: 'wallet_switchEthereumChain',
//       params: [{ chainId: networks.ethereum.chainId }],
//     });
//   } catch (error) {
//     if ((error as any).code !== 4902) return;
//     await addEthereumChain();
//   }
// };

export const signMetamaskMessage = async (message: string) => {
  if (typeof window.ethereum === 'undefined') return;
  try {
    const address = await (
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
    )[0];
    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [address, message],
    });
    return signature;
  } catch (error) {
    if ((error as any).code === 4001) {
      console.log('User denied request');
    }
    console.error(JSON.stringify(error));
    return null;
  }
};

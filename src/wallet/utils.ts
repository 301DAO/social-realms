import { utils } from 'ethers';

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

    if (Number(chainId) !== Number(switchToChainId)) {
      switchNetwork(switchToChainId);
      onChainChange();
    } else {
      onChainChangeSettled();
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

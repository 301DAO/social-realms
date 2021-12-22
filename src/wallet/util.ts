declare const window: any
import { utils } from 'ethers'
const chainIds: {
  [chainId: string]: string
} = {
  ethereum: '0x1',
  bsc: '0x38',
}

const rpcUrls: {
  [chainId: string]: string
} = {
  ethereum: 'https://mainnet.infura.io/ocCdekUYwOyLn7h7OlJM',
  bsc: 'https://bsc-dataseed.binance.org',
}

export const networks = {
  ethereum: {
    network_id: 1,
    hashed_chain_id: '0x1',
  },
  bsc: {
    network_id: 56,
    hashed_chain_id: '0x38',
  },
  avalanche: {
    network_id: 'avalanche',
    hashed_chain_id: '0x0',
  },
}

export const checkSumAddress = (address: string) => utils.getAddress(address)

/**
 * by default it switches to Ethereum. Update parameters for bsc or add more chainIds and rpcUrls for other networks.
 * chainid has to be a hex string
 */

export const switchNetwork = async (
  hexChainId = chainIds.ethereum,
  rpcUrl = rpcUrls.ethereum
) => {
  if (!window.ethereum) return

  try {
    await window?.ethereum?.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: hexChainId }],
    })
  } catch (error) {
    if ((error as any).code !== 4902) return
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: hexChainId,
            rpcUrl,
          },
        ],
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export const signMessage = async (message: string) => {
  if (!window.ethereum) return
  try {
    const address = await (
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
    )[0]
    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [address, message],
    })
    return signature
  } catch (error) {
    if ((error as any).code === 4001) {
      console.log('User denied request')
    }
    console.error(JSON.stringify(error))
  }
}

export const userAddress = async () => {
  if (!window.ethereum) return
  try {
    const address = await (
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
    )[0]
    return address.toLowerCase()
  } catch (error: any) {
    throw new Error(error)
  }
}

// TODO: workout a way to gen deterministic secert
export const newUserPassword = async () => {
  if (!window.ethereum) return
}

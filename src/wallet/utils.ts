declare const window: any
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { utils, Wallet } from 'ethers'
import { networks } from './constants'

const newCredentials = async () => {
  const menemonic = ''
  const wallet = Wallet.createRandom({
    extraEntropy: utils.randomBytes(32),
  })

  //const key = await window.ethereum.eth.accounts.create('test')
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic,
    publicKey: wallet.publicKey,
  }
}

// console.log(utils.keccak256('0x983110309620D911731Ac0932219af06091b6744'))
// console.log(utils.hashMessage('0x983110309620D911731Ac0932219af06091b6744'))
// console.log(utils.id('0x983110309620D911731Ac0932219af06091b6744'))

// checksum address
export const checksumAddress = (address: string) => {
  try {
    return utils.getAddress(address.toLowerCase())
  } catch {
    return false
  }
}
// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return utils.getAddress(value)
  } catch {
    return false
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress({
  address,
  chars = 4,
}: {
  address: string
  chars?: number
}): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

// account is not optional
function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

const ENS_NAME_REGEX = /^(([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+)eth(\/.*)?$/
export function parseENSAddress(
  ensAddress: string
): { ensName: string; ensPath: string | undefined } | undefined {
  const match = ensAddress.match(ENS_NAME_REGEX)
  if (!match) return undefined
  return { ensName: `${match[1].toLowerCase()}eth`, ensPath: match[4] }
}

/**
 * by default it switches to Ethereum. Update parameters for bsc or add more chainIds and rpcUrls for other networks.
 * chainid has to be a hex string
 */

export const switchNetwork = async () => {
  if (typeof window.ethereum === 'undefined') return
  try {
    await window?.ethereum?.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: networks.ethereum.chainId }],
    })
  } catch (error) {
    if ((error as any).code !== 4902) return
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: networks.ethereum.chainId,
            rpcUrl: networks.ethereum.rpcUrl,
          },
        ],
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export const signMessage = async (message: string) => {
  if (typeof window.ethereum === 'undefined') return
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
  if (!window || !window.ethereum) return
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
export const newUserPassword = () => {
  if (typeof window.ethereum === 'undefined') return
  return window.ethereum.createRandom()
}

import { base64Encode } from 'src/utils/base64-encoder'

const COVALENT_ENDPOINT = 'https://api.covalenthq.com/v1'
const COVALENT_API_KEY = process.env.NEXT_PUBLIC_COVALENT_API_KEY || ''
// Ethereum's chain ID
const CHAIN_ID = 1

const CovalentRequest = async (relativePath: string) => {
  const url = `${COVALENT_ENDPOINT}/${CHAIN_ID}/${relativePath}`
  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64Encode(COVALENT_API_KEY)}`,
    },
    redirect: 'follow',
  }
  try {
    const response = await fetch(url, options)
    return response.json()
  } catch (error: any) {
    throw new Error(error)
  }
}

/**
 * retrieve past transactions for a given address
 */
export const getTxsForAddress = async (address: string) => {
  const relativePath = `address/${address}/transactions_v2/`
  return CovalentRequest(relativePath)
}

export const getHistoricalPortfolioValue = async (address: string) => {
  const relativePath = `address/${address}/portfolio_v2/`
  return CovalentRequest(relativePath)
}

export const getERC20tokenTransfersForAddress = async (
  address: string,
  contractAddress: string
) => {
  const relativePath = `address/${address}/transfers_v2/?contract-address=${contractAddress}`
  return CovalentRequest(relativePath)
}

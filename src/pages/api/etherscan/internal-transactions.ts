import type { NextApiRequest, NextApiResponse } from 'next';
import { utils } from 'ethers';
import { getInternalTransactions } from '@/lib';

export default async function internalTransactionHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'only POST is supported' });
  }
  try {
    const { startBlock, endBlock, address } = req.body;

    if (!address || !startBlock || !endBlock) {
      return res.status(400).json({ success: false, message: 'valid address is required' });
    }
    const response = await getInternalTransactions({
      startBlock,
      endBlock,
      address: utils.getAddress(address as string),
    });
    return res.status(200).json({ success: true, response });
  } catch (error) {
    console.error(
      'Error occured in /api/etherscan/internal-transactions.ts: ',
      error instanceof Error ? error.message : error
    );
  }
  return res
    .status(422)
    .json({ success: false, message: 'Could not fetch internal transactions from etherscan' });
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { hashToTransaction } from '@/lib';

export default async function byHashHandlerHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'only GET is supported' });
  }
  try {
    const { hash } = req.query;

    if (!hash) {
      return res.status(400).json({ success: false, message: 'valid hash is required' });
    }
    const response = await hashToTransaction(hash as string);

    return res.status(200).json({ success: true, response });
  } catch (error) {
    console.error(
      'Error occured in /api/etherscan/transaction-by-hash.ts: ',
      error instanceof Error ? error.message : error
    );
  }
  return res
    .status(422)
    .json({ success: false, message: 'Could not retrieve transaction by hash from etherscan' });
}

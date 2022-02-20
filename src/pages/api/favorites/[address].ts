import { passAddressRegex } from '@/utils';
import { prisma } from '@/lib/clients';
import type { NextApiRequest, NextApiResponse } from 'next';
import { utils } from 'ethers';

export default async function favoritesHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET')
    return res.status(405).json({ success: false, message: 'only GET is supported' });

  try {
    const { address } = req.query;

    if (!address || !passAddressRegex(address as string)) {
      return res.status(400).json({ success: false, message: 'valid address is required' });
    }

    const favorites = await prisma.like.findMany({
      where: {
        likedBy: utils.getAddress(address as string),
      },
    });

    const transactions = favorites.map(({ hash }) => hash);
    return res.status(200).json({ success: true, transactions });
  } catch (error) {
    console.error(`Error in api/favorites: `, error instanceof Error ? error.message : error);
  }
  return res.status(422).json({ success: false, message: 'Failed to retrieve favorites' });
}

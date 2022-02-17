import { prisma } from '@/lib/clients';
import type { NextApiRequest, NextApiResponse } from 'next';
import { utils } from 'ethers';

export default async function followHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'only POST is supported' });
  }
  try {
    const { address, addressToFollow } = req.body;

    if (!address || !addressToFollow) {
      return res.status(400).json({ success: false, message: 'valid address is required' });
    }
    const response = await prisma.follower.create({
      data: {
        followeeAddress: utils.getAddress(addressToFollow as string),
        followerAddress: utils.getAddress(address as string),
      },
    });
    return res.status(200).json({ success: true, response });
  } catch (error) {
    console.error('Error occured in /api/follow: ', error instanceof Error ? error.message : error);
  }

  return res.status(422).json({ success: false, message: 'Follow API operation failed' });
}

import { prisma } from '@/lib/clients';
import type { NextApiRequest, NextApiResponse } from 'next';
import { utils } from 'ethers';

export default async function unfollowHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ success: false, message: 'only POST is supported' });

  try {
    const { address, addressToUnfollow } = req.body;
    if (!address || !addressToUnfollow) {
      return res.status(400).json({ success: false, message: 'valid address is required' });
    }

    const response = await prisma.follower.deleteMany({
      where: {
        followeeAddress: utils.getAddress(addressToUnfollow as string),
        followerAddress: utils.getAddress(address as string),
      },
    });
    if (!response) throw new Error('Unfollow operation failed');

    return res.status(200).json({ success: true, response });
  } catch (error) {
    console.error(
      'Error occured in /api/unfollow: ',
      error instanceof Error ? error.message : error
    );
  }

  return res.status(422).json({ success: false, message: `Unfollow API operation failed` });
}

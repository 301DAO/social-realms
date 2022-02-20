import { passAddressRegex } from '@/utils';
import { prisma } from '@/lib/clients';
import type { NextApiRequest, NextApiResponse } from 'next';
import { utils } from 'ethers';

export default async function isUserFollowedHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ success: false, message: 'only POST is supported' });

  try {
    const { followeeAddress, followerAddress } = req.body;
    if (
      !followeeAddress ||
      !followerAddress ||
      !passAddressRegex(followeeAddress as string) ||
      !passAddressRegex(followerAddress as string)
    ) {
      return res.status(400).json({ success: false, message: 'valid address is required' });
    }

    const response = await prisma.follower.findFirst({
      where: {
        followeeAddress: utils.getAddress(followeeAddress as string),
        followerAddress: utils.getAddress(followerAddress as string),
      },
    });

    const followed = response?.followerAddress === utils.getAddress(followerAddress as string);
    return res.status(200).json({ success: true, followed });
  } catch (error) {
    console.error(
      'Error occured in /api/is-followed: ',
      error instanceof Error ? error.message : error
    );
  }
  return res
    .status(401)
    .json({ success: false, message: `User is followed check API operation failed` });
}

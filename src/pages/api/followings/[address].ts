import { passAddressRegex } from '@/utils';
import { prisma } from '@/lib/clients';
import type { NextApiRequest, NextApiResponse } from 'next';
import { utils } from 'ethers';

export default async function followingsHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET')
    return res.status(405).json({ success: false, message: 'only GET is supported' });

  try {
    const { address } = req.query;
    if (!address || !passAddressRegex(address as string)) {
      return res.status(400).json({ success: false, message: 'valid address is required' });
    }

    const followings = await prisma.follower.findMany({
      where: {
        followerAddress: utils.getAddress(address as string),
      },
      select: { followeeAddress: true },
    });
    const addresses = followings.map(_ => _.followeeAddress);

    return res.status(200).json({ success: true, addresses });
  } catch (error) {
    console.error(
      'Error occured in /api/followings: ',
      error instanceof Error ? error.message : error
    );
  }
  return res
    .status(401)
    .json({ success: false, message: `Followings retrieval API operation failed` });
}

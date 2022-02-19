import { isValidEthAddress } from '@/utils';
import { prisma } from '@/lib/clients';
import type { NextApiRequest, NextApiResponse } from 'next';
import { utils } from 'ethers';

export default async function followersHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET')
    return res.status(405).json({ success: false, message: 'only GET is supported' });

  try {
    const { address } = req.query;

    if (!address || !isValidEthAddress(address as string)) {
      return res.status(400).json({ success: false, message: 'valid address is required' });
    }
    const followers = await prisma.follower.findMany({
      where: {
        followeeAddress: utils.getAddress(address as string),
      },
      select: { followerAddress: true },
    });
    const addresses = followers.map(_ => _.followerAddress);
    
    return res.status(200).json({ success: true, addresses });
  } catch (error) {
    console.error(
      'Error occured in /api/followers: ',
      error instanceof Error ? error.message : error
    );
  }
  return res
    .status(422)
    .json({ success: false, message: 'Followers retrieval API operation failed' });
}

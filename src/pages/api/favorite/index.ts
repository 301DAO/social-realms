import { prisma } from '@/lib/clients';
import type { NextApiRequest, NextApiResponse } from 'next';
import { utils } from 'ethers';
/**
 * If exists then remove it - e.g., "DISLIKE" / "UNFAVORITE"
 * If not exists then add it - e.g., "LIKE" / "FAVORITE"
 */
export default async function favoriteHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'only POST is supported' });
  }

  try {
    const { address, hash } = req.body;
    if (!address || !hash) throw new Error('address and hash are required');
    // {
    // 	return res
    // 		.status(400)
    // 		.json({ success: false, message: "valid address and tx hash required" });
    // }
    const exists = await prisma.like.findMany({
      where: {
        hash,
        likedBy: utils.getAddress(address as string),
      },
    });

    if (exists.length > 0) {
      // remove it
      await prisma.like.deleteMany({
        where: {
          hash,
          likedBy: utils.getAddress(address as string),
        },
      });
      return res.status(200).json({ success: true, message: `${address} unfavorited ${hash}` });
    }
    await prisma.like.create({
      data: {
        hash,
        likedBy: utils.getAddress(address as string),
      },
    });
    return res.status(200).json({ success: true, message: `${address} favorited ${hash}` });
  } catch (error) {
    console.error(
      'Error occured in /api/favorite: ',
      error instanceof Error ? error.message : error
    );
  }
  return res.status(401).json({ success: false, message: `Favorite API operation failed` });
}

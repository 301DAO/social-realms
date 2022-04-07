import { utils } from 'ethers';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/clients';
import { alchemyGetAssetTransfers } from '@/lib/wrappers';
import { AlchemyGetAssetTransfersResponse, Transfer } from '@/lib/wrappers/alchemy.types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'only POST is supported' });
  }

  try {
    const { address } = req.query as { address: string | undefined };
    if (!address) {
      return res.status(400).json({ success: false, message: 'address is required' });
    }

    const followings = await prisma.follower.findMany({
      where: { followerAddress: utils.getAddress(address) },
      select: { followeeAddress: true },
    });
    const addresses = followings.map(_ => _.followeeAddress);

    if (!addresses) {
      return res
        .status(400)
        .json({ success: false, message: 'no addresses found', transfers: null });
    }

    const transfers = await Promise.allSettled(addresses.map(getAssetTransfers));
    const fulfilled = transfers.filter(
      ({ status }) => status === 'fulfilled'
    ) as PromiseFulfilledResult<Transfer[]>[];
    const data = fulfilled.map(({ value }) => value).flat();

    return res
      .status(200)
      .json({ success: true, message: '', transfers: data.filter(Boolean).reverse() });
  } catch (error) {
    console.warn('Error in api/asset-transfers.ts: ', error);

    return res.status(500).json({
      success: false,
      message: `error encountered: ${error instanceof Error ? error.message : error}`,
    });
  }
}

type FullfilledResult = PromiseFulfilledResult<AlchemyGetAssetTransfersResponse>[];

async function getAssetTransfers(address: string) {
  const transfersTo = await alchemyGetAssetTransfers({ toAddress: address });
  const transfersFrom = await alchemyGetAssetTransfers({ fromAddress: address });
  const promise = await Promise.allSettled([transfersFrom, transfersTo]);
  const fulfilled = promise.filter(({ status }) => status === 'fulfilled') as FullfilledResult;

  return fulfilled.map(({ value }) => value.result?.transfers).flat();
}

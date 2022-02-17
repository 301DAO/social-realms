import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/clients';
import { utils } from 'ethers';
import { generateNonce } from 'siwe';

export default async function loginHandlerHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    res.status(405).json({ success: false, message: 'Method not allowed' });

  try {
    const { address } = req.body;
    if (!address) res.status(406).json({ success: false, message: 'address is required' });

    const validAddress = utils.getAddress(address as string);
    if (!validAddress) throw new Error('valid address is required');

    const user = await prisma.user.upsert({
      where: { publicAddress: validAddress },
      update: { lastLogin: new Date().toISOString() },
      create: {
        publicAddress: validAddress,
        nonce: generateNonce(),
        lastLogin: new Date().toISOString(),
      },
    });

    if (!user) throw new Error('Encountered an error while updating/creating user record');

    return res.status(200).json({ success: true, message: null, user });
  } catch (error) {
    console.error(
      'Error occured in /api/authlogin.ts: ',
      error instanceof Error ? error.message : error
    );
  }
  res.status(401).end({
    success: false,
    message: 'Sign in failed',
    user: null,
  });
}

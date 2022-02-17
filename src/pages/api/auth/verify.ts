import type { NextApiRequest, NextApiResponse } from 'next';
import { generateAccessToken, setAccessToken } from '@/lib';
import { prisma } from '@/lib/clients';
import { SiweMessage, generateNonce } from 'siwe';
import { utils } from 'ethers';

export default async function verifyHandlerHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Not allowed' });
  }

  try {
    const { address, signature, message } = req.body;
    if (!address || !signature || !message) {
      return res.status(406).json({
        success: false,
        message: 'address, signature, and message are required',
      });
    }

    const user = await prisma.user.findUnique({
      where: { publicAddress: utils.getAddress(address) },
    });

    if (!user) throw new Error('User not found');
    // {
    // 	return res.status(401).json({
    // 		success: false,
    // 		message: `user with address: ${address} doesn't exist`,
    // 	});
    // }
    const siweMessage = new SiweMessage(message);
    const fields = await siweMessage.validate(signature);
    const verified = !!fields;

    if (!verified) throw new Error('Could not verify signature');
    // {
    //   return res.status(401).json({ success: false, message: 'signature is not valid' });
    // }

    // if verified, update nonce, create tokens, and send tokens
    const updateNonce = await prisma.user.update({
      where: { id: user.id },
      data: { nonce: generateNonce(), lastLogin: new Date().toISOString() },
    });

    const accessToken = generateAccessToken(updateNonce);
    setAccessToken(res, accessToken);

    return res.status(200).json({
      success: true,
      message: 'successfully verified',
      user: updateNonce,
    });
  } catch (error) {
    console.error(
      'Error occured in /api/auth/verify.ts: ',
      error instanceof Error ? error.message : error
    );
  }
  res.status(401).json({
    success: false,
    message: `Could not verify user`,
  });
}

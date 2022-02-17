import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticate, generateAccessToken, setAccessToken } from '@/lib/auth';

export default function authHandlerHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { authenticated, message, user } = authenticate(req);

    if (authenticated && !!user) {
      const token = generateAccessToken(user);
      setAccessToken(res, token);

      return res.status(200).json({
        authenticated,
        message: null,
        user,
      });
    }

    return res.status(401).json({ authenticated, message, user: null });
  } catch (error) {
    console.error(
      'Error occured in /api/auth/index.ts: ',
      error instanceof Error ? error.message : error
    );
  }
  res.status(401).send({
    authenticated: false,
    message: 'auth yourself first',
    user: null,
  });
}

import { ACCESS_TOKEN_SECRET } from '@/constants';
import { getAccessToken } from '@/lib/auth';
import { verify } from 'jsonwebtoken';
import type { NextApiRequest } from 'next';
import type { User } from '@/types';
import type { JwtPayload } from 'jsonwebtoken';
import { valueExists } from '@/utils';

type UserJwtPayload = JwtPayload & { user: User };

interface AuthenticateResponse {
  authenticated: boolean;
  message: string | null;
  user: User | null;
}

export const authenticate = (req: NextApiRequest): AuthenticateResponse => {
  try {
    const token = getAccessToken(req);

    if (!valueExists(token)) throw new Error('No access token found');
    if (!valueExists(ACCESS_TOKEN_SECRET)) throw new Error('No access token secret found');

    const verified = verify(token, ACCESS_TOKEN_SECRET) as UserJwtPayload | null;
    if (!verified) throw new Error('Invalid access token');

    return {
      authenticated: true,
      message: 'auth success',
      user: verified.user,
    };
  } catch (error) {
    console.log('Error in authenticate.ts: ', error instanceof Error ? error.message : error);
  }
  return {
    authenticated: false,
    message: 'not authneticated',
    user: null,
  };
};

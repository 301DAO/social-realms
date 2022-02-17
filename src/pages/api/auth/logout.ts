import type { NextApiRequest, NextApiResponse } from 'next';
import { ACCESS_TOKEN_NAME } from '@/constants';
import { serialize } from 'cookie';

export default function logoutHandler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'GET') {
    return response.status(405).json({ success: false, message: 'GETa request is required' });
  }

  try {
    const cookie = serialize(ACCESS_TOKEN_NAME, '', { maxAge: -1, path: '/' });
    response.setHeader('Set-Cookie', cookie);

  } catch (error) {
    console.error(
      `Error occured in /api/auth/logout.ts: `,
      error instanceof Error ? error.message : error
    );

  } finally {
    response.writeHead(302, { Location: '/login' });
    response.end();
    return;
  }
}

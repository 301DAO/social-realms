import {
  ACCESS_TOKEN_NAME,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_MAX_AGE,
  ACCESS_TOKEN_EXPIRY_DATE,
} from '../../constants';
import { serialize, parse } from 'cookie';
import { sign } from 'jsonwebtoken';
import type { User } from "@/types";
import type { NextApiRequest, NextApiResponse } from 'next';

export const generateAccessToken = (user: User) => {
  return sign({ user }, ACCESS_TOKEN_SECRET!, {
    expiresIn: ACCESS_TOKEN_MAX_AGE,
    algorithm: 'HS256'
  });
};

export const setAccessToken = (res: NextApiResponse, accessToken: string) => {
  const serialized = serialize(ACCESS_TOKEN_NAME, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: ACCESS_TOKEN_MAX_AGE,
    expires: ACCESS_TOKEN_EXPIRY_DATE,
    path: `/`,
    sameSite: `lax`
  });
  res.setHeader('Set-Cookie', serialized);
};

export const clearAccessToken = (res: NextApiResponse) => {
  const serialized = serialize(ACCESS_TOKEN_NAME, '', {
    maxAge: -1,
    path: '/'
  });
  res.setHeader('Set-Cookie', serialized);
};

export function parseToken(req: NextApiRequest) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies;

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie;
  return parse(cookie || '');
}

export function getAccessToken(req: NextApiRequest) {
  const token = parseToken(req);
  return token[ACCESS_TOKEN_NAME];
}

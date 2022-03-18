export * from './tokens';
export * from './time';
export * from './network';

export const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.VERCEL_URL
    : `http://localhost:${process.env.NEXT_PUBLIC_DEV_PORT}`;

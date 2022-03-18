export * from './tokens';
export * from './time';
export * from './network';

const PORT = process.env.PORT || process.env.NEXT_PUBLIC_DEV_PORT;

export const API_BASE_URL =
  process.env.NODE_ENV === 'development' ? `http://localhost:${PORT}` : `${process.env.VERCEL_URL}`;

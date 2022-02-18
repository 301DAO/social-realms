import { TIME } from './time';

export const ACCESS_TOKEN_NAME = process.env.ACCESS_TOKEN_NAME;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_MAX_AGE = TIME.HOUR * 8;
export const ACCESS_TOKEN_EXPIRY_DATE = new Date(Date.now() + ACCESS_TOKEN_MAX_AGE * 1000);

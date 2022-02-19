export * from './nft-utils';
export * from './time';

export function base64Encode(str: string) {
  return Buffer.from(str, 'utf-8').toString('base64');
}

export const currency = (number: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(number);
};

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const valueExists = (value: any): boolean => value !== undefined && value !== null;

export const isValidEthAddress = (address: string) => {
  if (!valueExists(address)) return false;
  const regex = /^(0x)?[0-9a-f]{40}$/i;
  return regex.test(address);
};

export const falsyValue = (value: any): boolean => {
  switch (value) {
    case 0:
    case -0:
    case '':
    case ``:
    case NaN:
    case '0':
    case null:
    case false:
    case undefined:
    case typeof value === 'undefined':
      return true;
    default:
      return false;
  }
};

export const range = (start: number, end: number) =>
  Array.from({ length: end - start }, (v, k) => k + start);

//(start: number, end: number, length = end - start + 1) =>
//Array.from({ length }, (_, i) => start + i);

export const isWindowLoaded = typeof window !== 'undefined';
export const hasEthereum = typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
export const hasMetaMask =
  typeof window !== 'undefined' &&
  typeof window.ethereum !== 'undefined' &&
  typeof window.ethereum.isMetaMask !== 'undefined';

export * from './misc';
export * from './media-types';
export * from './media-extensions';
export * from './bad-nft-urls';
export * from './string-validators';
export * from './time';

export const valueExists = (value: any): boolean => value !== undefined && value !== null;

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

export const isWindowLoaded = typeof window !== 'undefined';
export const hasEthereum = typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
export const hasMetaMask =
  typeof window !== 'undefined' &&
  typeof window.ethereum !== 'undefined' &&
  typeof window.ethereum.isMetaMask !== 'undefined';

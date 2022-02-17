import { createAlchemyWeb3 } from '@alch/alchemy-web3';

const KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY || '';

export const alchemyHTTP = createAlchemyWeb3(`https://eth-mainnet.alchemyapi.io/${KEY}`);
export const alchemyWSS = createAlchemyWeb3(`wss://eth-mainnet.ws.alchemyapi.io/ws/${KEY}`);

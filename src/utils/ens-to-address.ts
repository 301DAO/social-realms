import { getDefaultProvider } from 'ethers';

export const ensToAddress = async (name: string) => {
  const provider = getDefaultProvider();
  return await provider.resolveName(name);
};

import { wagmiProvider } from "@/wallet";

export const ensToAddress = async (name: string) => {
  const provider = wagmiProvider();
  return await provider.resolveName(name);
};

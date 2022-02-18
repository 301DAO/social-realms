import { hasMetaMask } from '@/utils';
import { providers } from 'ethers';
import * as React from 'react';
import { useQuery } from 'react-query';
import { TIME } from '@/constants';

const useProvider = () => {
  try {
    return React.useMemo(() => {
      return hasMetaMask
        ? new providers.Web3Provider(window.ethereum as any)
        : new providers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_PROJECT_ID);
    }, []);
  } catch (error) {
    console.log('error in useProvider: ', error instanceof Error ? error.message : error);
  }
  return null;
};

export const useEnsImage = (name: string): [string | any, boolean, boolean] => {
  const provider = useProvider();

  const [validEns, setValidEns] = React.useState(false);
  React.useEffect(() => {
    if (!provider) return;
    if (name) provider.resolveName(name).then(_ => setValidEns(!!_));
  }, [name, provider]);

  const { data, isLoading, isError } = useQuery(
    ['ens-avatar', name],
    async () => {
      try {
        if (!provider) return;
        const image = await provider.getAvatar(name);
        return image;
      } catch (error) {
        console.error(`Error in useEnsImage: `, error instanceof Error ? error.message : error);
      }
      return null;
    },
    {
      enabled: validEns,
      staleTime: TIME.HOUR,
      cacheTime: TIME.HOUR,
      refetchOnMount: false,
    }
  );

  return [data, isLoading, isError];
};

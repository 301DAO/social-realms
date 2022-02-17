import * as React from 'react';
import { useQuery } from 'react-query';
import { queryEnsSubgraph } from '@/lib/wrappers';
import { TIME } from '@/constants';

export const useQueryENS = ({
  address = '',
  name = '',
  enabled = true,
}: {
  address?: string;
  name?: string;
  enabled?: boolean;
}): [address: string, name: string, loading: boolean] => {
  const param = address || name;

  const {
    data: ensQueryResult,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ['ens-query', param],
    async () => {
      const response = await queryEnsSubgraph({
        name: param as string,
        address: param as string,
      });
      if (!response) return null;
      return response.data;
    },
    { enabled: !!param && enabled, staleTime: TIME.HOUR, refetchOnWindowFocus: false }
  );
  const { queriedAddress, queriedName } = React.useMemo(() => {
    if (!ensQueryResult) return { queriedAddress: '', queriedName: '' };
    const { addressQuery, nameQuery } = ensQueryResult;
    const returnedItem = addressQuery
      ?.concat(nameQuery!)
      .find(({ resolvedAddress }) => resolvedAddress.id);
    return {
      queriedAddress: returnedItem?.resolvedAddress?.id,
      queriedName: returnedItem?.name,
    };
  }, [ensQueryResult]);
  const _address = queriedAddress || address;
  const _name = !!queriedName ? queriedName : '';
  return [_address, _name, isLoading];
};

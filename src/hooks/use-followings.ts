import { useQuery } from 'react-query';
import axios from 'axios';
import { TIME } from '@/constants';
import { fetchFollowings } from '@/lib';

export const useFollowings = ({ address }: { address: string }): [string[], number, boolean] => {
  const { data, isLoading: isFollowingsLoading } = useQuery<string[]>(
    ['followings', address],
    async () => {
      try {
        const response = await fetchFollowings(address);
        const { addresses: followings } = response;
        return !!followings ? followings : [];
        //success ? followings : [];
      } catch (error) {
        console.error(`error in useFollowings: `, error instanceof Error ? error.message : error);
      }
      return [];
    },
    {
      enabled: !!address && address.startsWith('0x'),
      // staleTime: TIME.MINUTE * 5,
      // refetchOnWindowFocus: false,
    }
  );
  const followings = data || [];
  const followingsCount = followings.length || 0;
  return [followings, followingsCount, isFollowingsLoading];
};

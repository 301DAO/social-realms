import { useQuery } from 'react-query';
import type { QueryObserverResult } from 'react-query';
import { TIME } from '@/constants';
import axios from 'axios';

export const useFollowers = ({
  address,
}: {
  address: string;
}): [
  followers: string[],
  followersCount: number,
  isFollowersLoading: boolean,
  refetchFollowers: () => Promise<QueryObserverResult<string[], unknown>>
] => {
  const {
    data,
    isLoading: isFollowersLoading,
    refetch: refetchFollowers,
  } = useQuery<string[]>(
    ['followers', address],
    async () => {
      try {
        const response = await axios.get(`/api/followers/${address}`);
        const { success, addresses } = response.data;
        return success ? addresses : [];
      } catch (error: unknown) {
        console.error(`error in useFollowers: `, error instanceof Error ? error.message : error);
      }
    },
    {
      enabled: !!address && address.startsWith('0x'),
      // staleTime: TIME.MINUTE * 5,
      // refetchOnWindowFocus: false,
    }
  );
  const followers = data || [];
  const followersCount = followers.length || 0;
  return [followers, followersCount, isFollowersLoading, refetchFollowers];
};

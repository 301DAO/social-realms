import { useQuery } from 'react-query';
import { TIME } from '@/constants';
import axios from 'axios';

export const useFavorites = ({ address }: { address: string }): [string[], number, boolean] => {
  const { data, isLoading: isFavoritesLoading } = useQuery<string[]>(
    ['favorites', address],
    async () => {
      try {
        const response = await axios.get(`/api/favorites/${address}`);
        const { success, transactions } = response.data;
        return success ? transactions : [];
      } catch (error: unknown) {
        console.error(`error in useFavorites: `, error instanceof Error ? error.message : error);
      }
    },
    {
      enabled: !!address,
      staleTime: TIME.MINUTE * 5,
      refetchOnWindowFocus: false,
    }
  );
  const favorites = data || [];
  const favoritesCount = favorites.length || 0;
  return [favorites, favoritesCount, isFavoritesLoading];
};

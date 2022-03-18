import axios from 'axios';
import { API_BASE_URL } from '@/constants';
import type { Transfer } from '@/lib/wrappers/alchemy.types';

interface FetchFollowingsResponse {
  success: boolean;
  message: string;
  addresses?: string[];
}

export const fetchFollowings = async (address: string): Promise<FetchFollowingsResponse> => {
  const response = await axios.get<FetchFollowingsResponse>(
    `${API_BASE_URL}/api/followings/${address}`
  );
  return response.data;
};

interface FetchAssetTransfersResponse {
  success: boolean;
  message: string;
  transfers?: Transfer[];
}

export const fetchAssetTransfers = async (
  address: string
): Promise<FetchAssetTransfersResponse> => {
  const { data } = await axios.get<FetchAssetTransfersResponse>('/api/asset-transfers', {
    params: { address },
  });
  return data;
};

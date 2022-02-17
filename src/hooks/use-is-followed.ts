import * as React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

export const useIsFollowed = ({
  followeeAddress,
  followerAddress,
}: {
  followeeAddress: string;
  followerAddress: string;
}): [isFollowed: boolean, isFollowedLoading: boolean] => {
  const { data: followed, isLoading: followedLoading } = useQuery(
    ['is-followed', followeeAddress, followerAddress],
    async () =>
      await isFollowed({
        followeeAddress,
        followerAddress,
      }),
    {
      enabled:
        !!followeeAddress &&
        !!followerAddress &&
        followeeAddress.startsWith('0x') &&
        followerAddress.startsWith('0x'),
    }
  );
  return [followed, followedLoading];
};

const isFollowed = async ({
  followeeAddress,
  followerAddress,
}: {
  followeeAddress: string;
  followerAddress: string;
}) => {
  try {
    const response = await axios.post('/api/is-followed', {
      followeeAddress,
      followerAddress,
    });
    const { followed } = response.data;
    return followed;
  } catch (error: unknown) {
    console.error(`error in isFollowed: `, error instanceof Error ? error.message : error);
  }
  return null;
};

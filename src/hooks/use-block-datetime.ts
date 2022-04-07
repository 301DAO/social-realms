import * as React from 'react';
import { useQuery } from 'react-query';
import { useProvider } from 'wagmi';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

// for formatted date use .format('YYYY-MM-DD HH:mm:ss');
const unixEpochToHuman = (epoch: number) => dayjs.unix(epoch).fromNow();

export const useBlockDateTime = (blockNumber: number) => {
  const provider = useProvider();
  const { data, status } = useQuery([blockNumber], async () => {
    const { timestamp } = await provider.getBlock(blockNumber);
    return unixEpochToHuman(timestamp);
  });
  const blockOccurance = status === 'success' ? data : '';
  return blockOccurance;
};

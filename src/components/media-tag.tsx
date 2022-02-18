import { imageExtensions, imageMediaTypes, videoExtensions, videoMediaTypes } from '@/utils';
import * as React from 'react';
import { useQuery } from 'react-query';
import { fetchHeaders } from '@/lib/fetch-headers';
import { valueExists } from '@/utils';

const isImage = (str: string) => imageExtensions.some(item => str.endsWith(item));
const isVideo = (str: string) => videoExtensions.some(item => str.endsWith(item));
const style = 'w-full h-full object-center object-cover group-hover:opacity-75';

export const MediaComponent = ({ mediaUrl }: { mediaUrl: string }) => {
  const { data: mediaType } = useQuery(
    ['headers', mediaUrl],
    async () => await fetchHeaders({ url: mediaUrl }),
    {
      enabled: !!mediaUrl && !isImage(mediaUrl),
    }
  );

  if (!valueExists(mediaUrl)) return null;
  if (isImage(mediaUrl) || (!!mediaType && imageMediaTypes.includes(mediaType)))
    return <img src={mediaUrl} loading="lazy" className={style} alt="nft media" />;

  if (isVideo(mediaUrl) || (!!mediaType && videoMediaTypes.includes(mediaType)))
    return <video controls src={mediaUrl} autoPlay loop className={style} />;

  return null;
};

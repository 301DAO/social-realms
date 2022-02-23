import * as React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import { valueExists, isImage, isVideo, isImageContentType, isVideoContentType } from '@/utils';

const style = 'w-full h-full object-center object-cover group-hover:opacity-75';

const fethHeaders = async (url: string) =>
  await axios
    .head(url)
    .then(res => res.headers['content-type'])
    .catch(_ => console.log(_));

export const MediaComponent = ({ mediaUrl }: { mediaUrl: string }) => {
  const { data: mediaType } = useQuery(
    ['content-type', mediaUrl],
    async () => await fethHeaders(mediaUrl),
    { enabled: valueExists(mediaUrl) }
  );

  if (isImage(mediaUrl) || (!!mediaType && isImageContentType(mediaType))) {
    return <img src={mediaUrl} loading="lazy" className={style} alt="nft media" />;
  }

  if (isVideo(mediaUrl) || (!!mediaType && isVideoContentType(mediaType))) {
    return <video controls src={mediaUrl} autoPlay loop className={style} />;
  }

  return null;
};

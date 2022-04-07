import * as React from 'react';
import clsx from 'clsx';
import type { NFT } from '@/types';
import { MediaComponent } from '@/components';
import { isImage, isVideo, range } from '@/utils';

export const Nft = ({
  children,
  contract_address,
  token_id,
}: {
  children: React.ReactNode;
  contract_address: string;
  token_id: string;
}) => (
  <a
    href={`https://opensea.io/assets/${contract_address}/${token_id}`}
    target="_blank"
    rel="noreferrer"
    className="group"
  >
    <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-transparent">
      {children}
    </div>
  </a>
);

const style = 'w-full h-full object-center object-cover group-hover:opacity-75';
export const Gallery = ({ nfts }: { nfts: NFT[] }) => {
  const count = nfts.length;
  return (
    <div className="bg-transparent">
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <h2 className="sr-only">NFTs</h2>
        <div
          id="nfts"
          className={clsx(
            `grid grid-cols-1 gap-y-2 gap-x-2 sm:grid-cols-2 md:gap-y-6 md:gap-x-6 lg:grid-cols-3 xl:gap-x-4`,
            !!count && range(1, 4).includes(count) && `xl:grid-cols-2`
            // !!count && count > 9 && `md:grid-cols-4`
          )}
        >
          {nfts.map(({ cached_file_url, contract_address, token_id, name, description }, idx) => {
            const url = cached_file_url;
            if (!url) return null;
         
            if (isImage(url)) {
              return (
                <Nft key={idx} contract_address={contract_address} token_id={token_id}>
                  <img key={idx} src={url} alt={`${name} - ${description}`} className={style} />
                </Nft>
              );
            }
            if (isVideo(url)) {
              return (
                <Nft key={idx} contract_address={contract_address} token_id={token_id}>
                  <video key={idx} controls src={url} autoPlay loop className={style} />
                </Nft>
              );
            }
            return (
              <Nft key={idx} contract_address={contract_address} token_id={token_id}>
                <MediaComponent mediaUrl={url} />
              </Nft>
            );
          })}
        </div>
      </div>
    </div>
  );
};

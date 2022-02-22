import * as React from 'react';
import { utils } from 'ethers';
import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';
import { useEnsResolveName, useEnsLookup } from 'wagmi';
import { NFT } from '@/types';
import { Nft } from '@/components/layouts';
import { MediaComponent } from '@/components';
import { CopyIcon } from '@/components/icons';
import styles from '@/styles/gallery.module.css';
import { retrieveNftsByAddress } from '@/lib/wrappers';
import { useIntersectionObserver, useCopyToClipboard } from '@/hooks';
import { isImage, valueExists, isVideo, passEnsRegex, passAddressRegex } from '@/utils';

const LoadMoreButton = dynamic(() => import('@/components/load-more-button'));

const CopyButton = ({ buttonText, textToCopy }: { buttonText: string; textToCopy?: string }) => {
  const [copyButtonText, setCopyButtonText] = React.useState(buttonText);

  const [, copy] = useCopyToClipboard();

  const copyToClipboard = React.useCallback(async () => {
    await copy(textToCopy || window.location.href);
    setCopyButtonText('Copied');
    setTimeout(() => {
      setCopyButtonText('Copy profile link');
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      type="button"
      className="text-md mb-2 flex space-x-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center font-medium text-white hover:bg-gradient-to-bl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
      onClick={copyToClipboard}>
      <span>{copyButtonText}</span>
      <span>
        <CopyIcon />
      </span>
    </button>
  );
};

const Nfts: NextPage = () => {
  const router = useRouter();
  const { address: _param } = router.query;
  const param = _param as string;

  // if param is not an address, it means it's an ens, so skip fetch
  const [{ data: _name }] = useEnsLookup({ address: param, skip: !utils.isAddress(param) });
  const name = param && param.endsWith('.eth') ? param : Boolean(_name) ? _name : '';

  const [{ data: _address }] = useEnsResolveName({
    name: param,
    skip: !passEnsRegex(param) || passAddressRegex(param),
  });
  const address = param && (param.startsWith('0x') ? param : (_address as string));

  const [continuationToken, setContinuationToken] = React.useState('');
  const {
    data: infiniteQueryResponse,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ['infiniteQueryResponse', param],
    async () => {
      const { continuation, nfts } = await retrieveNftsByAddress({
        address: address,
        continuationToken,
      });
      setContinuationToken(continuation);
      return nfts;
    },
    {
      enabled: valueExists(address) && (address as string).startsWith('0x'),
      notifyOnChangeProps: 'tracked',
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const loadMoreButtonRef = React.useRef<HTMLButtonElement | null>(null);
  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: () => fetchNextPage({ pageParam: continuationToken }),
    enabled: !!continuationToken,
    rootMargin: '10px',
  });
  const loadMoreClickHandler = React.useCallback(() => {
    return fetchNextPage({ pageParam: continuationToken });
  }, [fetchNextPage, continuationToken]);

  return (
    <main className="flex flex-col items-center justify-start flex-grow min-h-screen px-0 pb-8 mt-4">
      <p className="mb-4 text-3xl font-black dark:text-white">{name ?? address}</p>

      {!!infiniteQueryResponse && <CopyButton buttonText="Copy profile link" />}

      <div className={styles.gallery}>
        {infiniteQueryResponse?.pages.map((page: any, idx: number) => (
          <React.Fragment key={idx}>
            {page?.map((nft: NFT, idx: number) => {
              const { cached_file_url, contract_address, token_id, name, description } = nft;
              const url = cached_file_url;
              if (!url) return null;
              const style = 'w-full object-center object-cover group-hover:opacity-75';

              if (isImage(url)) {
                return (
                  <div className="m-2" key={idx}>
                    <Nft key={idx} contract_address={contract_address} token_id={token_id}>
                      <img key={idx} src={url} alt={`${name} - ${description}`} className={style} />
                    </Nft>
                  </div>
                );
              }
              if (isVideo(url)) {
                return (
                  <div className="m-2" key={idx}>
                    <Nft key={idx} contract_address={contract_address} token_id={token_id}>
                      <video key={idx} controls src={url} autoPlay loop className={style}>
                        <track kind="captions" srcLang="en">
                          Your browser doesn{"'"}t support embedded videos :\
                        </track>
                      </video>
                    </Nft>
                  </div>
                );
              }
              console.log(`Unknown media type: ${url}`);
              return (
                <div className="m-2" key={idx}>
                  <Nft contract_address={contract_address} token_id={token_id}>
                    <MediaComponent mediaUrl={url} />
                  </Nft>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <LoadMoreButton
        loadMoreRef={loadMoreButtonRef}
        disabled={isFetchingNextPage || isFetching || isLoading}
        loading={isFetchingNextPage || isFetching || isLoading}
        onLoadMoreClick={loadMoreClickHandler}
      />
    </main>
  );
};

export default Nfts;

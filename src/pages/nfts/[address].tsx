import * as React from 'react';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useIntersectionObserver, useQueryENS, useCopyToClipboard } from '@/hooks';
import { retrieveNftsByAddress } from '@/lib/wrappers';
import { useInfiniteQuery } from 'react-query';
import styles from '@/styles/gallery.module.css';
import { NFT } from '@/types';
import { MediaComponent } from '@/components';
import { CopyIcon } from '@/components/icons';

const LoadMoreButton = dynamic(() => import('@/components/load-more-button'));

const CopyButton = ({ buttonText }: { buttonText: string }) => {
  const [copyButtonText, setCopyButtonText] = React.useState(buttonText);

  const [, copy] = useCopyToClipboard();

  const copyToClipboard = React.useCallback(async () => {
    await copy(window.location.href);
    setCopyButtonText('Copied');
    setTimeout(() => {
      setCopyButtonText('Copy profile link');
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      type="button"
      className="text-md mr-2 mb-2 flex space-x-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center font-medium text-white hover:bg-gradient-to-bl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
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
  const { address: param } = router.query;

  const [address] = useQueryENS({
    address: param as string,
    name: param as string,
    enabled: !!param,
  });

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
        address: address as string,
        continuationToken,
      });
      setContinuationToken(continuation);
      return nfts;
    },
    {
      enabled: !!address || !(address as string).startsWith('0x'),
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
    <main className="mt-4 flex min-h-screen flex-grow flex-col items-center justify-start px-0 pb-8">
      <p className="mb-4 text-3xl font-black dark:text-white">{param}</p>

      {!!infiniteQueryResponse && <CopyButton buttonText="Copy profile link" />}

      <div className={styles.gallery}>
        {infiniteQueryResponse?.pages.map((page: any, idx: number) => (
          <React.Fragment key={idx}>
            {page?.map((nft: NFT, idx: number) => (
              <div className="m-2" key={idx}>
                <MediaComponent mediaUrl={nft.file_url} key={idx} />
              </div>
            ))}
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

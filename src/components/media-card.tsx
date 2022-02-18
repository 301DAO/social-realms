import { retrieveCollectionSaleStats } from '@/lib/wrappers';
import type { NFT } from '@/types';
import * as React from 'react';
import { useQuery } from 'react-query';
import { badUrls } from '@/utils/bad-nft-urls';
import { delay } from '@/utils/misc';
//const MediaComponent = dynamic(() => import('@/components/media-tag'));
import { MediaComponent } from '@/components';

const MediaCard = ({ nft }: { nft: NFT }) => {
  const { contract_address, token_id, file_url, name } = nft;

  const [performFetch, setPerformFetch] = React.useState(false);
  //const isMounted = useIsMounted();
  React.useEffect(() => {
    delay(3000).then(() => {
      setPerformFetch(true);
      return () => setPerformFetch(false);
    });
  }, []);

  const { data: collectionData } = useQuery(
    contract_address,
    async () => {
      const { statistics } = await retrieveCollectionSaleStats(contract_address);
      return statistics;
    },
    {
      enabled: !!contract_address && performFetch,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    }
  );
  if (file_url.length === 0 || badUrls.includes(file_url)) return <></>;
  return (
    <div className="max-w-md rounded-lg border border-gray-200 bg-white bg-no-repeat shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="pb-0">
        <MediaComponent mediaUrl={file_url} />
      </div>
      <a
        href={`https://opensea.io/assets/${contract_address}/${token_id}`}
        target="_blank"
        rel="noreferrer"
        className="break-word mb-1 px-3 pt-2 text-left font-normal text-gray-700 hover:text-blue-600 dark:text-gray-400"
      >
        {name}
      </a>
      <div className="flex justify-between space-x-6 p-2 px-3">
        <span className="text-md mr-2 rounded bg-blue-100 px-2.5 py-0.5 font-semibold text-gray-700 dark:bg-blue-200 dark:text-blue-800">
          AVG. {collectionData?.average_price && collectionData?.average_price.toFixed(2)} Ξ
        </span>
        <span className="text-md mr-2 rounded bg-blue-100 px-2.5 py-0.5 font-semibold text-gray-700 dark:bg-blue-200 dark:text-blue-800">
          FLR. {collectionData?.floor_price && collectionData?.floor_price.toFixed(2)} Ξ
        </span>
      </div>
    </div>
  );
};

export default MediaCard;

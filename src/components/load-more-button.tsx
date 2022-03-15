import clsx from 'clsx';
import * as React from 'react';

const LoadMoreButton = ({
  disabled,
  loading,
  onLoadMoreClick,
  loadMoreRef,
}: {
  disabled?: boolean;
  loading?: boolean;
  onLoadMoreClick: () => Promise<any>;
  loadMoreRef: React.RefObject<HTMLButtonElement>;
}) => (
  <button
    disabled={disabled}
    ref={loadMoreRef}
    type="button"
    className={clsx(
      'dark:text-white dark:hover:text-gray-900',
      'group relative mt-10 mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 hover:cursor-pointer hover:text-white focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:focus:ring-red-400',
      disabled && 'cursor-not-allowed',
      loading && 'cursor-wait'
    )}
    onClick={onLoadMoreClick}
  >
    <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900 ">
      {loading ? 'LOADING' : 'LOAD MORE'}
    </span>
  </button>
);

export default LoadMoreButton;

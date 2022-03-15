import clsx from 'clsx';
import * as React from 'react';
const RedYellowButton = ({
  text,
  onButtonClick,
  disabled,
  hidden,
}: {
  text: string;
  // eslint-disable-next-line no-unused-vars
  onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
  hidden?: boolean;
}) => (
  <button
    disabled={disabled}
    onClick={onButtonClick}
    className={clsx(
      'group relative mb-2 inline-flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400',
      hidden && 'hidden'
    )}
  >
    <span className="relative w-full rounded-md bg-white px-5 py-2.5 font-semibold transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
      {text}
    </span>
  </button>
);

export default RedYellowButton;

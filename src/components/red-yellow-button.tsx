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
      'relative inline-flex w-full items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-400',
      hidden && 'hidden'
    )}
  >
    <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 font-semibold">
      {text}
    </span>
  </button>
);

export default RedYellowButton;

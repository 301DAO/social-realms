import * as React from 'react';

export const SkeletonCard = () => (
  <div className="h-full min-h-[18rem] w-full min-w-min max-w-xs rounded-lg border border-gray-200 bg-white p-2 shadow-md dark:border-gray-700 dark:bg-gray-800">
    <div className="card translate-3d-none-after card translate-3d-none-after h-5/6 min-h-[14.5rem] animate-pulse rounded-md border bg-gray-200 p-2 pb-0"></div>
    <div className="mt-2 h-2 w-3/4 rounded bg-slate-200 pt-2"></div>
    <div className="flex flex-row justify-between align-bottom">
      <p className="mt-2 h-2 w-1/6 rounded bg-slate-200 pt-2"></p>
      <p className="mt-2 h-2 w-1/6 rounded bg-slate-200 pt-2"></p>
    </div>
  </div>
);

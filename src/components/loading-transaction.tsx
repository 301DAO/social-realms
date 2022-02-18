import * as React from 'react';

export const LoadingTransaction = () => (
  <div className="md:w-[400px] w-full mt-8">
    <div className="mx-auto rounded-md border border-blue-300 p-4 shadow">
      <div className="flex animate-pulse space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 rounded bg-gray-700"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-gray-700"></div>
              <div className="col-span-1 h-2 rounded bg-gray-700"></div>
            </div>
            <div className="h-2 rounded bg-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

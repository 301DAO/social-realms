import * as React from 'react';
import { tw } from 'twind';

export const LoadingTransaction = React.memo(() => (
  <div className={tw('sm:mt-0 sm:py-12 mx-32')}>
    <div className="border border-blue-300 shadow rounded-md p-4 mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-gray-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-gray-700 rounded col-span-2"></div>
              <div className="h-2 bg-gray-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
))

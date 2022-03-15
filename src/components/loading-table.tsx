import clsx from 'clsx';
import * as React from 'react';
const LoadingTable = ({ fakeRowsCount }: { fakeRowsCount?: number }) => {
  return (
    <div className="bg-base-100 grid w-full flex-grow gap-3 rounded-xl rounded-tl-none p-6 shadow-xl">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <tbody>
            {Array.from({ length: fakeRowsCount ?? 4 }).map((_, idx) => (
              <tr className={clsx(`animate-pulse`)} key={idx}>
                <th>
                  <label
                    className={clsx(`
                  bg-gray-700
                `)}
                  >
                    <input type="checkbox" className="checkbox bg-gray-300" disabled />
                  </label>
                </th>

                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-10 w-10 bg-gray-400"></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="h-2 w-28 rounded  border bg-gray-400 font-bold"></div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="h-2 w-56 rounded border bg-gray-400 font-bold"></div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="h-2 w-16 rounded border bg-gray-400 font-bold"></div>
                  </div>
                </td>
                <th>
                  <div className=" h-4 w-12 rounded border bg-gray-400"></div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default LoadingTable;

import clsx from 'clsx';
import * as React from 'react';
const LoadingTable = ({ fakeRowsCount }: { fakeRowsCount?: number }) => {
  return (
    <div className="grid flex-grow gap-3 p-6 shadow-xl rounded-xl bg-base-100 w-full rounded-tl-none">
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
                      <div className="w-10 h-10 mask mask-squircle bg-gray-400"></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold bg-gray-400 w-28  h-2 rounded border"></div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold bg-gray-400 w-56 h-2 rounded border"></div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold bg-gray-400 w-16 h-2 rounded border"></div>
                  </div>
                </td>
                <th>
                  <div className=" bg-gray-400 w-12 h-4 rounded border"></div>
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

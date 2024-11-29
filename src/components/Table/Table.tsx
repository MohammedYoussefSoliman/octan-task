import { Pagination } from '@/components';

import { TableProps } from './Table.types';
import useTable from './useTable';

export function Table<T extends { id: string; [key: string]: unknown }>({
  columns,
  tableData,
  isLoading,
  pagination = null,
}: TableProps<T>) {
  const { tHeaders, tRows, loadingRows } = useTable({
    columns,
    tableData,
  });

  return (
    <div className="flex flex-col gap-2 max-w-full">
      <div className="w-full bg-white overflow-auto mt-5 md:mt-2 flex-1 max-h-[calc(100vh-175px)] md:max-h-[calc(100vh-200px)] xl:max-h-[calc(100vh-165px)]">
        <table className="w-full border-spacing-0 border-separate">
          <thead className="sticky top-0">
            <tr>
              {tHeaders.map(({ Element, mapKey, headerColSpan, width }) => (
                <th
                  style={{
                    width,
                  }}
                  key={mapKey}
                  colSpan={headerColSpan}
                  className="sticky p-3 bg-indigo-50 whitespace-nowrap w-max first:rounded-l-lg last:rounded-r-lg text-left"
                >
                  {Element}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(isLoading ? loadingRows : tRows).map(
              ({ row, mapKey: rowMapKey }, index) => (
                <tr key={`${rowMapKey}${index}`}>
                  {row.map(({ Element, mapKey: elMapKey, colSpan }) => (
                    <td
                      key={elMapKey}
                      colSpan={colSpan}
                      className="border-b border-border py-1 md:py-2 px-3 first:px-4 last:px-4 w-max whitespace-nowrap"
                    >
                      {Element}
                    </td>
                  ))}
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div className="w-full p-2 h-[70px]">
          <Pagination
            pagesLength={pagination.lastPage || 0}
            activePage={pagination.page}
            handleNext={() => pagination.setPage(pagination.page + 1)}
            handlePrev={() => pagination.setPage(pagination.page - 1)}
            dotClick={(value) => pagination.setPage(value)}
          />
        </div>
      )}
    </div>
  );
}

import { Pagination } from '@/components';
import { cn } from '@/utils';

import { TableProps } from './Table.types';
import useTable from './useTable';

export function Table<T extends { id: string; [key: string]: unknown }>({
  headers,
  tableData,
  isLoading,
  pagination = null,
}: TableProps<T>) {
  const { tHeaders, tRows, loadingRows } = useTable({
    headers,
    tableData,
  });

  return (
    <div className="max-w-full max-h-full">
      <div
        className={cn('w-full overflow-auto mt-5 md:mt-2', {
          'max-h-[68%] md:max-h-[84%]': pagination,
          'max-h-[72%] md:max-h-[90%]': !pagination,
        })}
      >
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
                  className="sticky p-3 bg-primary-50 whitespace-nowrap w-max first:rounded-l-lg last:rounded-r-lg text-left"
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
        <div className="w-full p-2 absolute bottom-1 inset-x-0 z-20">
          <Pagination
            pagesLength={pagination.meta.last_page || 0}
            activePage={pagination.page}
            handleNext={() => pagination.setPage((p) => p + 1)}
            handlePrev={() => pagination.setPage((p) => p - 1)}
            dotClick={(value) => pagination.setPage(value)}
            // selectOptions={[10, 25, 50]}
            // onSelect={(value) => {
            //   setPerPage(value);
            // }}
            // perPage={perPage}
            // loading={isLoading}
          />
        </div>
      )}
    </div>
  );
}

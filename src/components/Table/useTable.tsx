import React from 'react';

import { Skeleton, Typography } from '@/components';

import { TableProps, Thead, TRows } from './Table.types';

const createTypography = (content: React.ReactNode, className: string) => (
  <Typography as="p2" className={className}>
    {content}
  </Typography>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useTable = <T extends { id: string; [key: string]: any }>({
  headers,
  tableData,
}: Omit<TableProps<T>, 'footer' | 'isLoading' | 'pagination'>) => {
  const createHeaderElement = (
    header: string,
    formatter?: (header: string) => React.ReactNode,
  ) => {
    const content = formatter ? formatter(header) : header;

    return typeof content === 'string'
      ? createTypography(content, 'text-primary-500 font-semibold')
      : content;
  };

  const createCellElement = (
    header: TableProps<T>['headers'][0],
    rowData: T,
  ) => {
    const value = rowData[header.accessor];
    if (value === undefined) return '';

    const content = header.formatter
      ? header.formatter({ data: rowData, value })
      : value;
    return typeof content === 'string'
      ? createTypography(content, 'text-natural-600 font-medium')
      : content;
  };

  const tHeaders: Thead = headers.map((h, index) => ({
    Element: createHeaderElement(h.header, h.headerFormatter),
    mapKey: `${h.header}-${index}`,
    width: h.width,
    headerColSpan: h.headerColSpan,
  }));

  const tRows: TRows = tableData.map((rowData, rowIndex) => ({
    row: headers.map((header, colIndex) => ({
      Element: createCellElement(header, rowData),
      mapKey: `cell-${rowIndex}-${colIndex}`,
    })),
    mapKey: `row-${rowIndex}`,
  }));

  const loadingRows: TRows = Array.from({ length: 15 }, (_, rowIndex) => ({
    row: headers.map((_, colIndex) => ({
      Element: (
        <div className="w-[100px]">
          <Skeleton className="w-full h-7" />
        </div>
      ),
      mapKey: `loading-cell-${rowIndex}-${colIndex}`,
    })),
    mapKey: `loading-row-${rowIndex}`,
  }));

  return { tHeaders, tRows, loadingRows };
};

export default useTable;

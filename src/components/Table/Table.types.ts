/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { PaginationProps } from '@/components/Pagination/Pagination.types';

export type TableProps<T extends { id: string; [key: string]: unknown }> = {
  columns: {
    header: string;
    headerFormatter?: (header: string) => React.ReactNode;
    formatter?: ({ data }: { data: T; value: any }) => React.ReactNode;
    accessor: keyof T;
    headerColSpan?: number;
    width?: string;
    isLoading?: boolean;
  }[];
  tableData: T[];
  headerColor?: string;
  isLoading?: boolean;
  footer?: {
    paginationControls: Omit<PaginationProps, 'pagesLength'>;
    count: number;
    limit: number;
  };
  pagination?: {
    page: number;
    lastPage: number;
    setPage: (value: number) => void;
  } | null;
};

export type Thead = {
  Element: React.ReactNode;
  mapKey: string;
  headerColSpan?: number;
  width?: string;
}[];
export type TRow = {
  Element: React.ReactNode;
  mapKey: string;
  colSpan?: number;
}[];

export type TRows = { row: TRow; mapKey: string }[];

export type PaginationMeta = {
  current_page: number;
  prev: number;
  last: number;
  per_page: number;
  total: number;
};

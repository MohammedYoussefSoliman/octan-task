/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction } from 'react';

import { PaginationProps } from '../../molecules';

export type TableProps<T extends { id: string; [key: string]: unknown }> = {
  headers: {
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
    setPage: Dispatch<SetStateAction<number>>;
    meta: PaginationMeta;
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
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  path: string;
  links: {
    active: boolean;
    label: string;
    url: string | null;
  }[];
};

import React from 'react';

export type CellType =
  | {
      value: string | number | React.ReactNode;
      formatter?: (value: string | number | React.ReactNode) => React.ReactNode;
    }
  | string
  | number;

export type TableElement = {
  [key: string]: CellType;
};

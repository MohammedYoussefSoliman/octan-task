import React from 'react';

import { Props, GroupBase } from 'react-select';
import { AsyncProps } from 'react-select/async';

export type OptionType = {
  label: React.ReactNode;
  value: string | number;
};
export type AsyncOptionType = {
  label: React.ReactNode;
  stringLabel: string;
  value: string;
};

export type SelectProps = {
  name: string;
  options: OptionType[];
  label?: string;
  error?: string;
  rounded?: boolean;
  dense?: boolean;
  isMulti?: true;
  required?: true | string;
  fullHeight?: boolean;
  changeHandler?: (value: any) => void;
} & Omit<
  Props<OptionType, boolean, GroupBase<OptionType>>,
  'components' | 'isMulti'
>;
export type AsyncSelectProps = {
  name: string;
  loadOptions: (
    inputValue: string,
    callback: (options: AsyncOptionType[]) => void,
  ) => Promise<AsyncOptionType[]>;
  label?: string;
  error?: string;
  rounded?: boolean;
  required?: true | string;
  fullHeight?: boolean;
  changeHandler?: (value: any) => void;
} & AsyncProps<OptionType, boolean, GroupBase<OptionType>>;

import React, { HTMLProps } from 'react';

import {
  Mode,
  SubmitHandler,
  UseFormReturn,
  DefaultValues,
  Resolver,
  FieldValues,
} from 'react-hook-form';

export interface FormProps<T extends FieldValues>
  extends Omit<HTMLProps<HTMLFormElement>, 'onSubmit' | 'children'> {
  validateOn?: Mode;
  reValidateOn?: Exclude<Mode, 'onTouched' | 'all'>;
  defaultValues?: DefaultValues<any>;
  onSubmit?: SubmitHandler<T>;
  children: React.ReactNode | ((api: UseFormReturn<T>) => React.ReactNode);
  resolver?: Resolver<T, any>;
  className?: string;
}

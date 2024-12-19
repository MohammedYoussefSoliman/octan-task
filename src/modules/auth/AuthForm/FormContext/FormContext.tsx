import React from 'react';

import {
  useForm,
  FormProvider,
  Mode,
  DefaultValues,
  Resolver,
} from 'react-hook-form';

import { FormDataType } from '../types';

export interface FormProps {
  validateOn?: Mode;
  reValidateOn?: Exclude<Mode, 'onTouched' | 'all'>;
  defaultValues?: DefaultValues<any>;
  children: React.ReactNode;
  resolver?: Resolver<FormDataType, any>;
}

export default function FormContext({
  children,
  validateOn,
  defaultValues,
  reValidateOn,
  resolver,
}: FormProps) {
  const methods = useForm<FormDataType>({
    mode: validateOn,
    reValidateMode: reValidateOn,
    defaultValues,
    resolver,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

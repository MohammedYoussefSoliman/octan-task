import React from 'react';

import {
  Control,
  FieldErrorsImpl,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';

export type MultiFileInputProps = {
  name: string;
  label?: string;
  control: Control<any>;
  error?: string;
  uploadAction: (file: FileList) => Promise<void>;
  deleteAction: (
    id: number | string,
    productId: number | string,
  ) => Promise<void>;
};

export type FileType = {
  file: null | string | File;
  id: string;
  url?: string;
};

export interface FileInputPropsType
  extends Omit<React.InputHTMLAttributes<any>, 'required'> {
  name: string;
  label?: string;
  className?: string;
  required?: true | string;
  fileUrl?: string;
  file?: FileType;
  section?: string;
  accepts?: string[];
  setValue: UseFormSetValue<any>;
  setError: UseFormSetError<any>;
  clearErrors: UseFormClearErrors<any>;
  uploadAction: (file: File) => Promise<any>;
  deleteAction: (id: number | string) => Promise<void>;
  disabled?: boolean;
  error?: string;
  hideWhileDisabled?: boolean;
}

export type MultipleFilesProps = {
  name: string;
  files?: {
    file: File;
    id: string;
    url?: string;
  }[];
  uploadAction: (file: File) => Promise<any>;
  deleteAction: (id: number | string) => Promise<void>;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  register: UseFormRegister<any>;
  setError: UseFormSetError<any>;
  clearErrors: UseFormClearErrors<any>;
  label?: string;
  section?: string;
  required?: string | true;
  maxFiles?: number;
  errors?: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
};

export type EmptyButtonProps = {
  disabled?: boolean;
};

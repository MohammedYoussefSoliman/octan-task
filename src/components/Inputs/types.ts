import React from 'react';

import { CheckboxProps } from '@mui/material';
import {
  Control,
  FieldValue,
  FieldValues,
  UseFormGetValues,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
  ValidateResult,
  ValidationRule,
} from 'react-hook-form';
import { MaskedInputProps as MaskProps } from 'react-text-mask';

export type FormValidationRules = {
  required: string | ValidationRule<boolean>;
  pattern: ValidationRule<RegExp>;
  min: ValidationRule<number | string>;
  max: ValidationRule<number | string>;
  maxLength: ValidationRule<number>;
  minLength: ValidationRule<number>;
  validate: (
    value: FieldValue<FieldValues>,
  ) => ValidateResult | Promise<ValidateResult>;
};

export interface InputPropsType
  extends Omit<React.InputHTMLAttributes<any>, 'required'> {
  name: string;
  label?: string;
  error?: string;
  className?: string;
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  dense?: boolean;
  prefixComponent?: React.ReactNode;
  suffixComponent?: React.ReactNode;
  variant?: 'filled' | 'outlined';
  accepts?: string;
  rounded?: boolean;
  required?: true | string;
  borderless?: boolean;
  changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helper?: React.ReactNode;
}

export interface MaskedInputProps extends InputPropsType {
  maskProps: MaskProps;
}

export interface TextAreaPropsType
  extends Omit<React.TextareaHTMLAttributes<any>, 'required'> {
  name: string;
  label?: string;
  error?: string;
  className?: string;
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  dense?: boolean;
  prefixComponent?: React.ReactNode;
  suffixComponent?: React.ReactNode;
  variant?: 'filled' | 'outlined';
  accepts?: string;
  rounded?: boolean;
  required?: true | string;
  borderless?: boolean;
  changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface FileInputPropsType
  extends Omit<React.InputHTMLAttributes<any>, 'required' | 'type'> {
  name: string;
  label?: string;
  error?: string;
  className?: string;
  required?: true | string;
  url?: string;
  variant?: 'base' | 'slim' | 'large';
  accepts?: string[];
  section?: string;
  setError?: UseFormSetError<any>;
  setValue: UseFormSetValue<any>;
  changeHandler?: (fileId: string) => void;
}

export type RadioOptionType = {
  label: string;
  value: string | number;
};

export interface RadioType {
  name: string;
  options: RadioOptionType[];
  watch: UseFormWatch<any>;
}

export interface RadioPropsType {
  name: string;
  label?: string;
  className?: string;
  variant?: 'ban' | 'normal';
  options: RadioOptionType[];
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  required?: true | string;
  error?: string;
  handleChange?: (value: string | number) => void;
}

export type OptionType = {
  label: React.ReactNode;
  value: string | number;
};

export type AsyncOptionType = {
  label: React.ReactNode;
  stringLabel: string;
  value: string;
};

export type ControllerType<T extends FieldValues> = {
  control: Control<T>;
  validationRules?: Partial<FormValidationRules>;
};

export interface CommonInputProps {
  name: string;
}

export interface CheckboxPropsType extends CheckboxProps {
  name?: string;
  label?: string;
  error?: string;
  width?: React.CSSProperties['width'];
  iconSize?: number;
  fillColor?: string;
  changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type CountryType = {
  dialCode: string;
  ar: string;
  en: string;
  code: string;
  flag: string;
};

export type DateInputProps = {
  name: string;
  error?: string;
  onChange?: (value: Date | null | undefined) => void;
  value?: Date | null;
  label?: string;
  required?: true | string;
};

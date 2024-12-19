import React from 'react';

import _ from 'lodash';
import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FileInputPropsType, ControllerType } from '../types';

import BaseFileInput from './FileBaseInput';
import LargeFileInput from './LargeFileInput';
import SlimBaseFileInput from './SlimFileInput';
import withHookFormController from './withFileHookFormController';

type WithControllerProps<T extends FieldValues> = ControllerType<T> &
  FileInputPropsType;

export default function FileInput<T extends FieldValues>({
  validationRules,
  variant,
  ...props
}: WithControllerProps<T>) {
  const Input = React.useMemo(
    () =>
      withHookFormController<T, WithControllerProps<T>>(
        variant === 'large'
          ? LargeFileInput
          : variant === 'slim'
            ? SlimBaseFileInput
            : BaseFileInput,
      ),
    [variant],
  );

  const { required } = props;
  const { t } = useTranslation('app');

  const resolvedRequired = React.useMemo(() => {
    let obj = {};
    if (required) {
      obj = {
        validate: (value: any) =>
          !_.isEmpty(value) ||
          t(typeof required === 'string' ? required : 'requiredField'),
      };
    }
    return obj;
  }, [required, t]);

  return (
    <Input
      validationRules={{
        ...resolvedRequired,
        ...validationRules,
      }}
      {...props}
      value={undefined}
    />
  );
}

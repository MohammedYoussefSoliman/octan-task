import React from 'react';

import _ from 'lodash';
import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TextAreaPropsType, ControllerType } from '../types';
import withHookFormController from '../withHookFormController';

import BaseInput from './BaseAreaInput';

type WithControllerProps<T extends FieldValues> = ControllerType<T> &
  TextAreaPropsType;

export default function TextArea<T extends FieldValues>({
  validationRules,
  ...props
}: WithControllerProps<T>) {
  const Input = React.useMemo(
    () => withHookFormController<T, WithControllerProps<T>>(BaseInput),
    [],
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
    />
  );
}

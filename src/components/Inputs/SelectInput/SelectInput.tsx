import React from 'react';

import _ from 'lodash';
import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ControllerType } from '../types';

import SelectBase from './SelectBase';
import { SelectProps } from './types';
import withHookFormController from './withHookFormController';

type WithControllerProps<T extends FieldValues> = ControllerType<T> &
  SelectProps;

export default function SelectInput<T extends FieldValues>(
  props: WithControllerProps<T>,
) {
  const Select = React.useMemo(
    () => withHookFormController<T, WithControllerProps<T>>(SelectBase),
    [],
  );

  const { required } = props;
  const { t } = useTranslation('app');

  return (
    <Select
      validationRules={
        required
          ? {
              validate: (value) =>
                !_.isEmpty(value) ||
                t(typeof required === 'string' ? required : 'requiredField'),
            }
          : undefined
      }
      {...props}
    />
  );
}

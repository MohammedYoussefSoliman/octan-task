import React from "react";
import { Controller, FieldValues, Path } from "react-hook-form";
import { ControllerType, InputPropsType } from "./types";

type WithControllerProps<T extends FieldValues> = ControllerType<T> &
  InputPropsType;

export default function withHookFormController<
  FormType extends FieldValues,
  Props extends WithControllerProps<FormType>,
>(Component: React.ComponentType<Omit<Props, keyof ControllerType<FormType>>>) {
  return function ControlledComponent({
    control,
    validationRules,
    ...rest
  }: Props) {
    const { name, changeHandler } = rest;

    return (
      <Controller
        name={name as Path<FormType>}
        control={control}
        rules={{ ...validationRules }}
        render={({
          field: { ref, onChange, ...fields },
          fieldState: { error },
        }) => (
          <Component
            {...fields}
            inputRef={ref}
            onChange={(e) => {
              onChange(e);
              if (changeHandler) changeHandler(e);
            }}
            error={error?.message}
            {...rest}
          />
        )}
      />
    );
  };
}

import React from 'react';

import InputError from '../InputError';
import InputLabel from '../InputLabel';
import { RadioPropsType } from '../types';

import RadioOption from './RadioOption';
import { RadioWrapper } from './styles';

export default function RadioInput({
  name,
  variant = 'normal',
  className,
  options,
  setValue,
  getValues,
  required,
  label,
  error,
  handleChange,
}: RadioPropsType) {
  const [activeValue, setActiveValue] = React.useState<string>(getValues(name));
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name, e.target.value);
    setActiveValue(e.target.value);
    if (handleChange) {
      handleChange(e.target.value);
    }
  };

  return (
    <RadioWrapper
      className={className}
      direction={variant === 'normal' ? 'column' : 'row'}
      gap={{ xs: 6, md: 8 }}
      p={variant === 'ban' ? '5px' : undefined}
      variant={variant}
      withWrap
    >
      {label && <InputLabel label={label} required={required} />}
      {options.map((option) => (
        <RadioOption
          key={option.label}
          variant={variant}
          label={option.label}
          value={String(option.value)}
          activeValue={activeValue}
          name={name}
          changeHandler={changeHandler}
        />
      ))}
      {error && <InputError error={error} />}
    </RadioWrapper>
  );
}

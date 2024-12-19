import { useTranslation } from 'react-i18next';

import { Flex } from '@/components/Grids';

import InputError from '../InputError';
import InputLabel from '../InputLabel';
import { AreaWrapper, TextArea } from '../styles';
import { TextAreaPropsType } from '../types';

export default function BaseAreaInput({
  name,
  label,
  variant = 'outlined',
  prefixComponent,
  suffixComponent,
  width,
  height,
  error,
  placeholder,
  className,
  rounded,
  required,
  borderless,
  dense,
  ...InputProps
}: TextAreaPropsType) {
  const { t } = useTranslation('app');

  return (
    <Flex
      className={className}
      width={width || '100%'}
      direction="column"
      gap={{ xs: 5, md: 8 }}
    >
      {label && <InputLabel label={label} required={required} />}
      <AreaWrapper
        className="area--wrapper"
        variant={variant}
        height={height}
        error={!!error}
        rounded={rounded}
        borderless={borderless}
        dense={dense}
        align="center"
        justify="space-between"
      >
        {prefixComponent && prefixComponent}
        <TextArea
          variant={variant}
          error={!!error}
          adornment={Boolean(suffixComponent || prefixComponent)}
          dense={dense}
          placeholder={placeholder && t(placeholder)}
          {...InputProps}
        />
        {suffixComponent && suffixComponent}
      </AreaWrapper>
      {error && <InputError error={error} name={name} />}
    </Flex>
  );
}

import React from 'react';

import { H5 } from '@/components/Typography';

import CounterButton from './CounterButton';
import Wrapper from './styles';

type Props = {
  onChange: (count: number) => void;
  disabled?: boolean;
  controlValue: number;
  value?: number;
  minValue?: number;
};

export default function Counter({
  onChange,
  disabled,
  controlValue,
  minValue,
  value,
}: Props) {
  const [currentValue, setCurrentValue] = React.useState<number>(
    value || controlValue,
  );

  const handleDisabledPlus = React.useCallback((): boolean => {
    return currentValue >= controlValue;
  }, [controlValue, currentValue]);

  const handleCounter = React.useCallback((type: 'minus' | 'plus') => {
    if (type === 'minus') {
      setCurrentValue((cr) => cr - 1);
    } else {
      setCurrentValue((cr) => cr + 1);
    }
  }, []);

  React.useEffect(() => {
    if (onChange) onChange(currentValue);
  }, [onChange, currentValue]);

  return (
    <Wrapper justify="center" align="center" disabled={disabled}>
      <CounterButton
        disabled={disabled || currentValue === minValue || currentValue <= 0}
        type="minus"
        onClick={() => handleCounter('minus')}
      />
      <H5 text={`${currentValue}`} fontSize="17px" weight={500} />
      <CounterButton
        type="plus"
        disabled={disabled || handleDisabledPlus()}
        onClick={() => handleCounter('plus')}
      />
    </Wrapper>
  );
}

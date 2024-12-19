import React from 'react';

import { useFormContext } from 'react-hook-form';

import { Flex } from '@/components/Grids';

import StyledInput from './styles';

type VerificationInputPropsType = {
  verificationCodeLength: number;
  name: string;
  onFinish?: (code: number[]) => void;
};

export default function VerificationInput({
  name,
  verificationCodeLength,
  onFinish,
}: VerificationInputPropsType) {
  const code = React.useRef<any>([]);
  const firstItem = React.useRef<HTMLInputElement>(null);
  const { setValue } = useFormContext();

  const handleCodeChanges = React.useCallback(
    (index: number, event: any) => {
      const currentCode = [...code.current];
      if (event.target.value.length === 1)
        currentCode[index] = event.target.value;
      if (event.target.nextSibling) {
        event.target.nextSibling.focus();
        event.target.nextSibling.select();
      }
      code.current = currentCode;
      setValue(name, currentCode.join(''));
      if (currentCode.length === verificationCodeLength) {
        if (onFinish) onFinish(currentCode);
      }
    },
    [name, onFinish, setValue, verificationCodeLength],
  );

  React.useEffect(() => {
    if (firstItem.current) {
      firstItem.current.focus();
    }
  }, []);

  const Inputs = React.useMemo(
    () =>
      Array.from({ length: verificationCodeLength }, (_, index) => (
        <StyledInput
          ref={index === 0 ? firstItem : null}
          type="number"
          onChange={(event) => handleCodeChanges(index, event)}
          value={code.current[index]}
        />
      )),
    [handleCodeChanges, verificationCodeLength],
  );

  return <Flex gap={{ xs: 6, md: 10, lg: 20 }}>{Inputs}</Flex>;
}

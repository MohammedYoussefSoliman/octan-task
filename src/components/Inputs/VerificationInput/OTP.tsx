import React from 'react';

import { useFormContext } from 'react-hook-form';
import Input from 'react-otp-input';

import { Wrapper } from './styles';

type VerificationInputPropsType = {
  verificationCodeLength: number;
  name: string;
  hasError: boolean;
  onFinish?: (code: string) => void;
};

export default function OTPInput({
  name,
  verificationCodeLength,
  onFinish,
  hasError,
}: VerificationInputPropsType) {
  const { setValue } = useFormContext();
  const [otpValue, setOtpValue] = React.useState('');

  const handleCodeChanges = React.useCallback((value: string) => {
    setOtpValue(value);
  }, []);

  React.useEffect(() => {
    if (otpValue.length === verificationCodeLength) {
      setValue(name, otpValue);
      if (onFinish) onFinish(otpValue);
    }
  }, [name, onFinish, otpValue, setValue, verificationCodeLength]);

  return (
    <Wrapper>
      <Input
        value={otpValue}
        inputStyle="otp-input"
        containerStyle="otp-container"
        // focusStyle="otp-input-focus"
        // errorStyle="otp-input-error"
        renderInput={(inputProps) => (
          <input
            {...inputProps}
            className={`otp-input ${hasError ? 'otp-input-error' : ''}`}
          />
        )}
        numInputs={verificationCodeLength}
        inputType="number"
        onChange={handleCodeChanges}
        shouldAutoFocus
      />
    </Wrapper>
  );
}

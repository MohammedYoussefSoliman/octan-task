import React from 'react';

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
  const [otpValue, setOtpValue] = React.useState('');

  const handleCodeChanges = React.useCallback((value: string) => {
    setOtpValue(value);
  }, []);

  React.useEffect(() => {
    if (otpValue.length === verificationCodeLength) {
      if (onFinish) onFinish(otpValue);
    }
  }, [name, onFinish, otpValue, verificationCodeLength]);

  return (
    <Wrapper>
      <Input
        value={otpValue}
        inputStyle="otp-input"
        containerStyle="otp-container"
        // focusStyle="otp-input-focus"
        // errorStyle="otp-input-error"
        numInputs={verificationCodeLength}
        inputType="number"
        onChange={handleCodeChanges}
        shouldAutoFocus
        renderInput={(inputProps) => (
          <input
            {...inputProps}
            className={`otp-input ${hasError ? 'otp-input-error' : ''}`}
          />
        )}
      />
    </Wrapper>
  );
}

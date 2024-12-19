import React from 'react';

import { Flex } from '@/components/Grids';
import { useAppSelector } from '@/hooks';

import DigitalAgreementAcceptance from './DigitalAgreementAcceptance';
import NafathStep from './NafathStep';
import NationalIdStep from './NationalIdStep';
import SendOTPStep from './SendOTPStep';
import { FormWrapper } from './styles';
import VerifyOTPStep from './VerifyOTPStep';

type Props = {
  onRegisterFailed: () => void;
  nafathOnly?: boolean;
};

export default function FormSteps({ onRegisterFailed, nafathOnly }: Props) {
  const requireNafathStep = useAppSelector(
    (state) => state.consumerAuth.requireNafathStep,
  );
  const [step, setStep] = React.useState<number>(0);

  const handleNext = React.useCallback(
    (stepValue?: number) => {
      if (typeof stepValue === 'number') {
        setStep(stepValue);
      } else {
        setStep((prev) => prev + 1);
      }
    },
    [setStep],
  );

  return (
    <FormWrapper fullWidth fullHeight>
      <form className="form">
        {nafathOnly ? (
          <Flex fullWidth fullHeight>
            {step === 0 && requireNafathStep && (
              <NationalIdStep handleNext={handleNext} />
            )}
            {step === 1 && requireNafathStep && (
              <NafathStep handleNext={handleNext} />
            )}
          </Flex>
        ) : (
          <Flex fullWidth fullHeight>
            {step === 0 && <SendOTPStep handleNext={handleNext} />}
            {step === 1 && <VerifyOTPStep handleNext={handleNext} />}
            {step === 2 && (
              <DigitalAgreementAcceptance onRegisterFailed={onRegisterFailed} />
            )}
          </Flex>
        )}
      </form>
    </FormWrapper>
  );
}

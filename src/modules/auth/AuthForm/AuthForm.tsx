import { useAuth } from '@/hooks';

import FormContext from './FormContext';
import FormSteps from './FormSteps';

type Props = {
  onRegisterFailed: () => void;
  nafathOnly?: boolean;
};

export default function AuthForm(props: Props) {
  const { national_id } = useAuth();
  return (
    <FormContext
      defaultValues={{
        dialCode: '+966',
        rememberMe: true,
        nationalId: national_id,
      }}
      validateOn="onBlur"
    >
      <FormSteps {...props} />
    </FormContext>
  );
}

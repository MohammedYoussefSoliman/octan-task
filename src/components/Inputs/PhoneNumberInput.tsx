import { FieldValues } from 'react-hook-form';

import countries from '@/assets/data/countries';
import { Flex } from '@/components/Grids';
import { MaskedTextInput, SelectInput } from '@/components/Inputs';
import { P3, Typography } from '@/components/Typography';
import { PHONE_NUMBER_MASK } from '@/helpers/constants';

import { ControllerType, CountryType, InputPropsType } from './types';

type WithControllerProps<T extends FieldValues> = ControllerType<T> &
  InputPropsType;

const dialCodeMapper = (country: CountryType) => {
  return {
    label: (
      <Flex
        key={country.dialCode}
        gap={{ xs: 6, md: 8 }}
        align="center"
        fullHeight
      >
        <Typography fontSize="24px" text={country.flag} />
        <P3 fontSize="16px" text={country.dialCode} />
      </Flex>
    ),
    value: country.dialCode,
  };
};

export default function PhoneNumberInput<T extends FieldValues>({
  control,
  label,
  ...props
}: WithControllerProps<T>) {
  return (
    <Flex gap={{ xs: 6, md: 12, lg: 16 }} fullWidth>
      <Flex width={{ xs: 210 }}>
        <SelectInput
          name="dialCode"
          label={label && 'dialCode'}
          control={control}
          options={countries
            .filter((country) => ['SA', 'AE'].includes(country.code))
            .map((country) => dialCodeMapper(country as CountryType))}
          dense
        />
      </Flex>
      <MaskedTextInput
        maskProps={{
          mask: PHONE_NUMBER_MASK,
          placeholder: props.placeholder,
          guide: false,
        }}
        control={control}
        label={label}
        validationRules={{
          ...props.validationRules,
          // pattern: {
          //   value: PHONE_NUMBER_REGEX,
          //   message: "invalidPhoneNumber",
          // },
          minLength: { value: 9, message: 'phoneMinLength' },
          maxLength: { value: 9, message: 'phoneMaxLength' },
        }}
        inputMode="numeric"
        {...props}
      />
    </Flex>
  );
}

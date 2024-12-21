import React from 'react';

import { useFormContext } from 'react-hook-form';

import { SelectInput } from '@/components';
import { OptionType } from '@/components/Inputs/types';
import { CheckOrderForm } from '@/helpers/types';
import { ShippingDetailsType } from '@/state/types';

import { SingleCarrierWrapper } from '../../styles';

import AsyncLabel from './AsyncLabel';

type Prop = {
  shippingCompanies: ShippingDetailsType;
  setIsDropOff: (isDropOff: boolean) => void;
};

function ShippingCompany({ shippingCompanies, setIsDropOff }: Prop) {
  const { control, setValue } = useFormContext<CheckOrderForm>();
  const [shippingOptions, setShippingOptions] = React.useState<OptionType[]>(
    [],
  );
  const [singleOption, setSingleOption] = React.useState<boolean>(false);

  const makeSelectOption = (option: any) => ({
    label: (
      <AsyncLabel
        label={option.deliveryOptionName}
        logo={option.logo}
        price={`${option.price} SAR`}
      />
    ),
    stringLabel: option.deliveryOptionName,
    value: option.deliveryOptionId,
  });

  const handleShippingCompanyOptions = (companies: any[]) => {
    const options = companies.map((option) => makeSelectOption(option));
    setShippingOptions(options);
    return options;
  };

  const handleSingleShoppingOption = (shippingCompany: any) => {
    setSingleOption(true);
    setValue('courierId', shippingCompany.deliveryOptionId);
    setValue('shippingCompany', makeSelectOption(shippingCompany));
    setIsDropOff(shippingCompany.drop_off);
  };

  const handleOnSelectChange = (value: string) => {
    setValue('courierId', value);
    const optionsIndex = shippingOptions?.findIndex(
      (opt) => opt.value === value,
    );
    setValue('shippingCompany', shippingOptions[optionsIndex].value);
    setIsDropOff(shippingCompanies[optionsIndex].drop_off);
  };

  const handleShippingCompanies = async () => {
    if (shippingCompanies) {
      if (shippingCompanies.length === 1) {
        handleSingleShoppingOption(shippingCompanies[0]);
      } else {
        handleShippingCompanyOptions(shippingCompanies);
      }
    }
  };
  React.useEffect(() => {
    handleShippingCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!shippingCompanies.length) return null;

  if (singleOption) {
    return (
      <SingleCarrierWrapper>
        <AsyncLabel
          label={shippingCompanies[0].deliveryOptionName}
          logo={shippingCompanies[0].logo}
          price={`${shippingCompanies[0].price} SAR`}
        />
      </SingleCarrierWrapper>
    );
  }

  return (
    <SelectInput
      fullHeight
      control={control}
      name="courierId"
      placeholder="chooseCourier"
      label="chooseCourier"
      changeHandler={(value) => {
        handleOnSelectChange(value);
      }}
      options={shippingOptions}
    />
  );
}
export default ShippingCompany;

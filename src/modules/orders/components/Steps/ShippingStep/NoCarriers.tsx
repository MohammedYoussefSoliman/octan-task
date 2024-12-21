import React from 'react';

import { useTheme } from '@emotion/react';
import loGet from 'lodash/get';
import loTrim from 'lodash/trim';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Flex,
  Icon,
  AsyncSelect,
  ConfirmModal,
  P1,
} from '@/components';
import { AsyncOptionType } from '@/components/Inputs/SelectInput/types';
import { useAxiosInstance } from '@/hooks';

import { filterOptions } from '../../../services';
import { NoCarriersWrapper } from '../../styles';

type Props = {
  onConfirm?: (cityId: string) => Promise<void>;
};

export default function NoShipment({ onConfirm }: Props) {
  const { colors } = useTheme();
  const { get } = useAxiosInstance();
  const [toggleHeight, setToggleHeight] = React.useState<boolean>(false);
  const [cityId, setCityId] = React.useState<string>();
  const [openConfirmModal, setOpenConfirmModal] =
    React.useState<boolean>(false);
  const [selectedCity, setSelectedCity] = React.useState<string>();
  const { t } = useTranslation('app');

  const loadCities = React.useCallback(
    async (
      inputValue: string,
      callback: (options: AsyncOptionType[]) => void,
    ): Promise<any[]> => {
      const { data } = await get('cities', {
        params: {
          search: loTrim(inputValue),
        },
      });
      const options: any[] = ((data.records as unknown as any[]) || []).map(
        (option) => ({
          label: option.name,
          stringLabel: option.name,
          value: option.id,
        }),
      );
      callback(filterOptions(inputValue, options));
      return options;
    },
    [get],
  );

  return (
    <Flex
      direction="column"
      height={{
        xs: toggleHeight ? '460px' : 'fit-content',
        md: toggleHeight ? '480px' : 'fit-content',
      }}
      gap={{ xs: 16, md: 32 }}
      fullWidth
    >
      <NoCarriersWrapper
        p={{ xs: 8, md: 16 }}
        gap={{ xs: 8 }}
        align="center"
        fullWidth
      >
        <Icon name="warning" size={30} color={colors.blue[700]} />
        <P1
          text="noCarrierStatement"
          capitalizeFirstLetter
          textAlign="center"
          color={colors.blue[700]}
        />
      </NoCarriersWrapper>
      <Flex gap={{ xs: 8, md: 16 }} align={{ xs: 'center' }} fullWidth>
        <AsyncSelect
          fullHeight
          name="Select"
          onMenuOpen={() => {
            setToggleHeight(true);
          }}
          onMenuClose={() => {
            setToggleHeight(false);
          }}
          placeholder="chooseCity"
          onChange={async (val) => {
            setCityId(loGet(val, 'value', '') as string);
            setSelectedCity(loGet(val, 'stringLabel'));
          }}
          loadOptions={loadCities}
        />
        <Button
          disabled={!cityId}
          onClick={() => setOpenConfirmModal(true)}
          type="button"
        >
          confirm
        </Button>
      </Flex>

      <ConfirmModal
        open={openConfirmModal}
        heading={t('sureSelectCityPhrase') + selectedCity}
        description="sureSelectCity"
        onClose={() => setOpenConfirmModal(false)}
        disableEscapeKeyDown
        onConfirm={async () => {
          if (cityId && onConfirm) {
            await onConfirm(cityId);
          }
        }}
        buttonLabel="confirm"
      />
    </Flex>
  );
}

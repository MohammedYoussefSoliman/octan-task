import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import { IconButton, Flex, P2 } from '@/components';
import { useAppSelector } from '@/hooks';

import { GoBackProps } from '../types';

import Button from './styles';

export default function GoBack({ callback }: GoBackProps) {
  const { language, brandingDetails } = useAppSelector((state) => state.ui);
  const { pallet } = useTheme();
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        if (callback) callback();
        else navigate(-1);
      }}
    >
      <Flex gap={{ xs: 6 }} align="center">
        <IconButton
          icon={`chevron-${language === 'ar' ? 'right' : 'left'}`}
          size="sm"
          variant="secondary"
          as="div"
          color={brandingDetails.primaryColor}
        />
        <P2
          text="goBack"
          hover={{ decoration: 'underline' }}
          color={brandingDetails.primaryColor ?? pallet.primary[500]}
          weight={500}
          capitalizeFirstLetter
        />
      </Flex>
    </Button>
  );
}

import { useTheme } from '@emotion/react';

import { P2, Flex, Icon, Link } from '@/components';
import { useAppSelector } from '@/hooks';

import { BoxWrapper } from './styles';

type Props = {
  agreementUrl: string;
  text: string;
};

export default function StoreAcceptancePolicy({ agreementUrl, text }: Props) {
  const { colors } = useTheme();
  const { language } = useAppSelector((state) => state.ui);
  return (
    <BoxWrapper
      direction="column"
      gap={{ xs: 8, md: 16 }}
      p={{ xs: 8, md: 16 }}
      background={colors.orange[100]}
      color={colors.orange[600]}
      fullWidth
    >
      <P2 text={text} color={colors.orange[700]} capitalizeFirstLetter />
      <Link to={agreementUrl} relative={false}>
        <Flex gap="8px" align="center">
          <P2
            text="refundAndReturnPolicy"
            color={colors.orange[700]}
            weight={500}
            hover={{ decoration: 'underline' }}
          />
          <Icon
            name={`arrow-${language === 'ar' ? 'left' : 'right'}`}
            color={colors.orange[700]}
          />
        </Flex>
      </Link>
    </BoxWrapper>
  );
}

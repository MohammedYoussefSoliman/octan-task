import React from 'react';

import { useTheme } from '@emotion/react';
import { Trans, useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { ErrorLottie } from '@/assets/lotties';
import {
  Button,
  Container,
  Flex,
  Paper,
  SocialBar,
  H5,
  P1,
  P2,
  P3,
} from '@/components';
import urls from '@/helpers/urls';
import { useAppDispatch } from '@/hooks';
import { flushOrder } from '@/state/order/slice';
import { changeHeaderVariant } from '@/state/ui/slice';

import { Anchor, BrandingWrapper } from './styles';

export default function FailedToCompletePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('app');
  const {
    state: { storeAgreementUrl, storeName, message },
  } = useLocation();

  React.useEffect(() => {
    // adjust the header for this module
    dispatch(flushOrder());
    dispatch(changeHeaderVariant('white'));
  }, [dispatch]);

  const { branding } = useTheme();

  const Wrapper = branding.isEnabled ? BrandingWrapper : React.Fragment;

  return (
    <Wrapper>
      <Container>
        <Paper mv="2rem" align="center" justify="center" fullWidth>
          <Flex
            mv="2rem"
            gap={{ xs: 7, md: 10, lg: 20 }}
            direction="column"
            align="center"
            justify="center"
            width={{ xs: '100%', md: '400px', lg: '500px' }}
          >
            <ErrorLottie size={100} />
            <H5
              text="sorryCanNotCompleteRefund"
              capitalizeFirstLetter
              textAlign="center"
            />
            {message && (
              <Flex
                gap={{ xs: 3, md: 7, lg: 10 }}
                direction="column"
                align="center"
                justify="center"
              >
                <P1
                  text="whyCanNotWeRefund"
                  textAlign="center"
                  capitalizeFirstLetter
                />
                <P1 text={message} textAlign="center" capitalizeFirstLetter />
              </Flex>
            )}
            <P2 textAlign="center" capitalizeFirstLetter>
              <Trans
                i18nKey="refusedToCompleteOrder"
                t={t}
                values={{ name: `${t('returnPolicyFor')} ${storeName}` }}
                components={{
                  linkId: (
                    <Anchor href={storeAgreementUrl} target="_blank">
                      placeholder
                    </Anchor>
                  ),
                }}
              />
            </P2>
            <Button
              onClick={() => navigate(urls.home)}
              size="md"
              fullWidth
              color={branding.primaryColor}
            >
              home
            </Button>
            <Flex direction="column" align="center" gap={10} ph={10} fullWidth>
              <P3>needHelp</P3>
              <SocialBar
                filter={['email', 'instagram', 'twitter']}
                spaceBetweenSize="dense"
                size="sm"
              />
            </Flex>
          </Flex>
        </Paper>
      </Container>
    </Wrapper>
  );
}

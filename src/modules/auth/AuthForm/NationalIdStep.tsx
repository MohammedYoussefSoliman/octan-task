import React from 'react';

import { useTheme } from '@emotion/react';
import { useFormContext } from 'react-hook-form';

import {
  H3,
  P2,
  P3,
  SocialBar,
  LocalizedNumberInput,
  Flex,
  Button,
} from '@/components';
import { formDataHandler } from '@/helpers/functions';
import { useAppDispatch, useAppSelector, useAxiosInstance } from '@/hooks';
import { setUpdateNationalId } from '@/state/auth/slice';

import FaqAccordion from '../../faqs/FaqAccordion';

import AuthPaper from './AuthPaper';
import { NafathGuildWrapper } from './styles';
import { FormDataType } from './types';

type Props = {
  handleNext: () => void;
};

export default function NationalIdStep({ handleNext }: Props) {
  const { colors } = useTheme();
  const {
    consumerAuth: { updateNationalId },
  } = useAppSelector((state) => state);
  const { getValues, control, setError } = useFormContext<FormDataType>();
  const dispatch = useAppDispatch();
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const { post } = useAxiosInstance();

  const onUpdateNationalId = React.useCallback(async () => {
    const { nationalId } = getValues();

    setSubmitting(true);
    try {
      if (updateNationalId) {
        const response = await post(
          'customer/update-national-id',
          formDataHandler({ national_id: nationalId }),
        );
        dispatch(setUpdateNationalId(false));
        if ([200, 201].includes(response.status)) handleNext();
      }
    } catch (error) {
      const errorRes = error as any;
      if (errorRes.response?.data) {
        if (setError)
          setError('nationalId', {
            type: 'api',
            message: errorRes.response?.data.errors[0].message,
          });
      }
    } finally {
      setSubmitting(false);
    }
  }, [dispatch, getValues, handleNext, post, setError, updateNationalId]);

  return (
    <AuthPaper>
      <Flex
        gap={{ xs: 10, md: 20, lg: 40 }}
        direction="column"
        justify="center"
        align="center"
        maxWidth="500px"
      >
        <Flex direction="column" align="center">
          <H3 text="personalInfo" capitalizeFirstLetter />
          <H3 text="nafathConfirmationNeeded" />
        </Flex>
        <Flex direction="column">
          <FaqAccordion
            question="whyNafathQuestion"
            answer="whyNafathAnswer"
            isTranslated={false}
          />
          <NafathGuildWrapper
            direction={{ xs: 'column' }}
            gap={{ xs: '16px' }}
            p={{ xs: 10, md: 16, xxl: 24 }}
          >
            <P2 text="requireNafath" color={colors.orange[800]} />
          </NafathGuildWrapper>
        </Flex>

        <Flex
          direction="column"
          fullWidth
          gap={{
            xs: 10,
            md: 20,
          }}
        >
          <Flex direction="column" fullWidth>
            <LocalizedNumberInput
              name="nationalId"
              label="nationalId"
              required="nationalIdRequired"
              control={control}
              maxLength={10}
              validationRules={{
                minLength: { value: 10, message: 'nationalIdMinLength' },
              }}
            />
          </Flex>
          <Flex
            justify="space-between"
            align="center"
            gap={10}
            ph={10}
            fullWidth
          >
            <P3>needHelp</P3>
            <SocialBar
              filter={['email', 'instagram', 'twitter']}
              spaceBetweenSize="dense"
              size="sm"
            />
          </Flex>
          {!updateNationalId ? (
            <Button
              type="button"
              onClick={handleNext}
              isLoading={submitting}
              fullWidth
            >
              registerSubmit
            </Button>
          ) : (
            <Button
              onClick={onUpdateNationalId}
              isLoading={submitting}
              fullWidth
            >
              updateNationalId
            </Button>
          )}
        </Flex>
      </Flex>
    </AuthPaper>
  );
}

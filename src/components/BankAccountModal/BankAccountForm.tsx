import React from 'react';

import {
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';

import { Form, Button, Flex, TextInput, P1 } from '@/components';
import { ARABIC_ENGLISH_LETTERS } from '@/helpers/constants';
import { formDataHandler } from '@/helpers/functions';
import modalKeys from '@/helpers/modalKeys';
import {
  useAppDispatch,
  useAppSelector,
  useAxiosInstance,
  useLocalTheme,
} from '@/hooks';
import StatusDescription from '@/modules/orders/components/OrderItemStatus/StatusDescription';
import { closeModal, showError, getBankAccounts } from '@/state';

import BankPaper from './styles';

type FormType = {
  firstName: string;
  middleName?: string;
  lastName: string;
  iban: string;
};

export default function AddBankAccountForm() {
  const dispatch = useAppDispatch();
  const { branding } = useLocalTheme();
  const [isDisabled, setIsDisabled] = React.useState<boolean>(true);
  const [validateIban, setValidateIban] = React.useState<boolean>(true);
  const [checkingIban, setCheckingIban] = React.useState<boolean>(false);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [bankDetails, setBankDetails] = React.useState<any | null>(null);
  const { post } = useAxiosInstance();
  const {
    consumerAuth: { user },
    ui: { language },
  } = useAppSelector((state) => state);
  const customerName = user.customer_names[language];
  const firstName = (customerName?.firstName || '').trim();
  const lastName = customerName?.lastName;
  const middleName = customerName?.secondName || customerName?.lastName;

  const checkIBAN = React.useCallback(
    async (
      iban: string,
      setValue: UseFormSetValue<FormType>,
      setError: UseFormSetError<FormType>,
      clearErrors: UseFormClearErrors<FormType>,
    ) => {
      setValue('iban', iban);
      setCheckingIban(true);
      try {
        const { data } = await post(
          'customer/checkIban',
          formDataHandler({ iban: iban.replace(/ /g, '') }),
        );
        clearErrors('iban');
        setBankDetails(data.records);
        setIsDisabled(false);
        setValidateIban(false);
      } catch (error) {
        const errorRes = error as any;
        if (errorRes.response?.data) {
          if (setError)
            setError('iban', {
              type: 'api',
              message: errorRes.response?.data.errors[0].message,
            });
        }
      } finally {
        setCheckingIban(false);
      }
    },
    [post],
  );

  // const debouncedCheckIban = debounce(checkIBAN, 500);

  const onSubmit = React.useCallback(
    async (data: FormType) => {
      setSubmitting(true);
      post(
        'customer/bankAccounts',
        formDataHandler({
          bank_id: bankDetails.id,
          first_name: data.firstName,
          last_name: data.lastName,
          middle_name: data.middleName,
          iban: data.iban,
        }),
      )
        .then(() => {
          dispatch(
            getBankAccounts({
              onSuccess() {
                dispatch(closeModal(modalKeys.addBankAccountModal));
              },
            }),
          );
        })
        .catch((err) => {
          dispatch(showError(err.response?.data.errors[0].message));
        });
    },
    [bankDetails, dispatch, post],
  );

  return (
    <Form
      defaultValues={{ firstName, middleName, lastName }}
      onSubmit={onSubmit}
    >
      {({
        control,
        handleSubmit,
        setValue,
        getValues,
        setError,
        clearErrors,
      }) => (
        <Flex direction="column" gap={{ xs: 16, md: 25, lg: 50 }} fullWidth>
          <Flex direction="column" gap={{ xs: 10, md: 16 }} fullWidth>
            <StatusDescription
              description="unacceptableIBANs"
              state="mixed"
              justify="center"
            />
            <Flex
              gap={{ xs: 6, md: 8, lg: 16 }}
              align={{ xs: 'center' }}
              fullWidth
            >
              <TextInput
                name="iban"
                label="iban"
                disabled={!validateIban}
                control={control}
                helper="ibanHelper"
                required
              />
            </Flex>
            {/* <Flex
              gap={{ xs: 6, md: 8, lg: 16 }}
              align={{ xs: "center" }}
              fullWidth
            >
              <MaskedTextInput
                name="iban"
                label="iban"
                disabled={checkingIban}
                maskProps={{
                  mask: IBAN_MASK,
                  placeholder: "iban",
                  guide: false,
                }}
                required
                control={control}
                helper="ibanHelper"
                changeHandler={async (e) => {
                  let valid;
                  if (e.target.value.length > 28) {
                    valid = await trigger("iban");
                  }
                  if (valid && e.target.value) {
                    setIban(e.target.value);
                    debouncedCheckIban(e.target.value, setError, clearErrors);
                  }
                }}
                onPaste={async (e) => {
                  const pastedValue = e.clipboardData.getData("Text");
                  if (pastedValue) {
                    setValue("iban", pastedValue);
                  }
                  await checkIBAN(pastedValue, setError, clearErrors);
                }}
                suffixComponent={checkingIban ? <Spinner /> : undefined}
              />
              {isAndroid && (
                <Flex mt={{ xs: "10px" }}>
                  <Button
                    onClick={() => {
                      if (addedIban)
                        checkIBAN(addedIban, setError, clearErrors);
                    }}
                    isLoading={checkingIban}
                  >
                    checkIban
                  </Button>
                </Flex>
              )}
            </Flex> */}
          </Flex>
          {bankDetails && (
            <BankPaper
              p={{ xs: 15, md: 18, lg: 20 }}
              gap={{ xs: 6, md: 8, lg: 16 }}
              align="center"
              fullWidth
              bg={
                branding.isEnabled && branding.primaryColor
                  ? branding.primaryColor
                  : undefined
              }
            >
              <Flex align="center" justify="center" p={2} className="logo">
                <img
                  className="logo--image"
                  src={bankDetails.logo}
                  alt="bank logo"
                />
              </Flex>
              <P1 text={bankDetails.name} />
            </BankPaper>
          )}
          {!validateIban && (
            <Flex
              gap={{ xs: 6, md: 8, lg: 16 }}
              direction={{ xs: 'column', md: 'row' }}
              fullWidth
            >
              <TextInput
                name="firstName"
                label="firstName"
                validationRules={{
                  pattern: {
                    value: ARABIC_ENGLISH_LETTERS,
                    message: 'invalidText',
                  },
                }}
                control={control}
                required
              />
              <TextInput
                name="middleName"
                label="middleName"
                validationRules={{
                  pattern: {
                    value: ARABIC_ENGLISH_LETTERS,
                    message: 'invalidText',
                  },
                }}
                control={control}
              />
              <TextInput
                name="lastName"
                label="lastName"
                validationRules={{
                  pattern: {
                    value: ARABIC_ENGLISH_LETTERS,
                    message: 'invalidText',
                  },
                }}
                control={control}
                required
              />
            </Flex>
          )}
          <Flex className="button--wrapper" fullWidth justify="flex-end">
            {validateIban ? (
              <Button
                type="button"
                isLoading={checkingIban}
                color={
                  branding.isEnabled && branding.primaryColor
                    ? branding.primaryColor
                    : undefined
                }
                onClick={() =>
                  checkIBAN(getValues('iban'), setValue, setError, clearErrors)
                }
              >
                checkIban
              </Button>
            ) : (
              <Button
                type="button"
                disabled={isDisabled}
                isLoading={submitting}
                color={
                  branding.isEnabled && branding.primaryColor
                    ? branding.primaryColor
                    : undefined
                }
                onClick={handleSubmit(onSubmit)}
              >
                addBank
              </Button>
            )}
          </Flex>
        </Flex>
      )}
    </Form>
  );
}

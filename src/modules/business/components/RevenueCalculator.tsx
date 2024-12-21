import React from 'react';

import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Form,
  Flex,
  LocalizedNumberInput,
  TextInput,
} from '@/components';
import { H2, H4, P1, P3 } from '@/components/Typography';
import { localizedNumberFormatter } from '@/helpers/functions';
import { useAppSelector, useBreakpoints } from '@/hooks';

import { CalculatorContainer } from '../style';
import calculateRevenue, {
  CalculatedRevenues,
  RevenueInputs,
} from '../utils/calculateRevenue';

import { CalcFlex, Calculator, CalculatorCard } from './styles';

function RevenueCalculator() {
  const { colors } = useTheme();
  const { t } = useTranslation('app');
  const { medium } = useBreakpoints();
  const { language } = useAppSelector((state) => state.ui);

  const [monthlyRepurchase, setMonthlyRepurchase] = React.useState<string>('0');
  const [monthlyRevenue, setMonthlyRevenue] = React.useState<string>('0');
  const [annualRevenue, setAnnualRevenue] = React.useState<string>('0');

  const onSubmit = React.useCallback((revenueInputs: RevenueInputs) => {
    const revenues: CalculatedRevenues = calculateRevenue(revenueInputs);

    setMonthlyRepurchase(localizedNumberFormatter(revenues.monthlyRepurchase));
    setMonthlyRevenue(localizedNumberFormatter(revenues.monthlyRevenue));
    setAnnualRevenue(localizedNumberFormatter(revenues.annualRevenue));
  }, []);

  return (
    <CalculatorContainer
      id="calculator"
      direction="column"
      fullWidth
      gap={{ xs: 22, sm: 28, lg: 40 }}
      mt={{ xs: 130 }}
      align="center"
      justify="center"
      height={{ xs: '900px', lg: '100vh' }}
      pt={160}
    >
      <H2 text="AddNewRevenue" />
      <Form onSubmit={onSubmit}>
        {({ control, setValue }) => {
          return (
            <Calculator
              height={!medium ? '900px' : '70vh'}
              justify="center"
              align="center"
              pb={100}
            >
              <CalculatorCard
                variant="light"
                position="left"
                width={medium ? '28%' : '90%'}
                p={36}
                zIndex={50}
              >
                <Flex
                  direction={{ xs: 'column-reverse', md: 'row' }}
                  gap={{ xs: 16, md: 24 }}
                  fullWidth
                >
                  <CalcFlex
                    className="calculator--item"
                    gap={{ xs: 20, md: 32 }}
                    direction="column"
                    fullWidth
                  >
                    <TextInput
                      name="monthlySalesVolume"
                      label={medium ? 'monthlySalesVolume' : ''}
                      placeholder="monthlySalesVolume"
                      control={control}
                      changeHandler={(e) => {
                        setValue(
                          'monthlySalesVolume',
                          localizedNumberFormatter(e.target.value),
                        );
                      }}
                      suffixComponent={
                        <P3 text="sar" color={colors.grey[400]} />
                      }
                    />
                    <LocalizedNumberInput
                      name="refundRateValue"
                      label={medium ? 'refundRate' : ''}
                      placeholder="refundRate"
                      max={100}
                      control={control}
                      suffixComponent={<P3 text="%" color={colors.grey[400]} />}
                    />
                    <LocalizedNumberInput
                      name="averageOrderValue"
                      label={medium ? 'averageOrderValue' : ''}
                      placeholder="averageOrderValue"
                      control={control}
                      changeHandler={(e) => {
                        setValue(
                          'averageOrderValue',
                          localizedNumberFormatter(e.target.value),
                        );
                      }}
                      suffixComponent={
                        <P3 text="sar" color={colors.grey[400]} />
                      }
                    />
                    <Flex justify="center" fullWidth>
                      <Button size="lg" className="calculate--button">
                        calculate
                      </Button>
                    </Flex>
                  </CalcFlex>
                </Flex>
              </CalculatorCard>
              <CalculatorCard
                position="right"
                width={{ xs: '90%', md: '32%' }}
                p={36}
                pt={
                  language === 'en' ? { xs: 120, md: 30 } : { xs: 70, md: 30 }
                }
              >
                <Flex
                  gap={{ xs: 0, md: 24 }}
                  direction="column"
                  ml="auto"
                  width="64%"
                  fullWidth={!medium}
                >
                  <CalcFlex
                    className="calculator--item"
                    direction="column"
                    align="flex-start"
                    fullWidth
                  >
                    <H4 text={monthlyRepurchase} color={colors.yellow[500]} />

                    {medium ? (
                      <P1
                        text="newMonthlyRepurchase"
                        color={colors.shades[100]}
                      />
                    ) : (
                      <P1
                        text="newMonthlyRepurchase"
                        color={colors.shades[100]}
                      />
                    )}
                  </CalcFlex>
                  <CalcFlex
                    className="calculator--item"
                    direction="column"
                    align="flex-start"
                    fullWidth
                  >
                    <H4
                      text={`${monthlyRevenue} ${t('sar')}`}
                      color={colors.yellow[500]}
                    />

                    {medium ? (
                      <P1 text="newMonthlyRevenue" color={colors.shades[100]} />
                    ) : (
                      <P1 text="newMonthlyRevenue" color={colors.shades[100]} />
                    )}
                  </CalcFlex>
                  <CalcFlex
                    className="calculator--item"
                    direction="column"
                    align="flex-start"
                    fullWidth
                  >
                    <H4
                      text={`${annualRevenue} ${t('sar')}`}
                      color={colors.yellow[500]}
                    />
                    {medium ? (
                      <P1 text="newAnnualRevenue" color={colors.shades[100]} />
                    ) : (
                      <P1 text="newAnnualRevenue" color={colors.shades[100]} />
                    )}
                  </CalcFlex>
                </Flex>
              </CalculatorCard>
            </Calculator>
          );
        }}
      </Form>
    </CalculatorContainer>
  );
}

export default React.memo(RevenueCalculator);

import { Checkbox as MuiCheckbox } from '@mui/material';
import tinycolor from 'tinycolor2';

import { Flex, Icon, P3 } from '@/components';
import { useLocalTheme } from '@/hooks';
import { withMuiThemeProvider } from '@/Providers';

import InputError from '../InputError';
import { CheckboxPropsType } from '../types';

function Checkbox({
  name,
  error,
  label,
  iconSize = 18,
  fillColor,
  ...props
}: CheckboxPropsType) {
  const theme = useLocalTheme();

  return (
    <Flex direction="column" gap={{ xs: 6, md: 8 }}>
      <Flex gap={{ xs: 7, md: 15 }} align="center">
        <MuiCheckbox
          name={name}
          {...props}
          icon={<Icon name="check" color="rgba(0,0,0,0)" size={iconSize} />}
          checkedIcon={
            <Icon
              name="check"
              color={theme.colors.shades[100]}
              size={iconSize}
            />
          }
          disableRipple
          sx={{
            border: '1px solid',
            borderColor: error
              ? theme.colors.error[300]
              : fillColor
                ? tinycolor(fillColor).darken(2).toString()
                : theme.colors.grey[400],
            width: '22px',
            height: '22px',
            background: props.disabled
              ? theme.colors.shades[400]
              : theme.colors.shades[100],
            borderRadius: '8px',
            padding: 0,
            '&.Mui-checked': {
              background: fillColor || theme.pallet.primary[400],
              borderColor: fillColor
                ? tinycolor(fillColor).darken(2).toString()
                : theme.pallet.primary[400],
            },
            '&.MuiCheckbox-indeterminate': {
              background: fillColor || theme.pallet.primary[400],
              borderColor: fillColor
                ? tinycolor(fillColor).darken(2).toString()
                : theme.pallet.primary[400],
            },
            '&:hover': {
              background: fillColor
                ? tinycolor(fillColor).setAlpha(0.15).toString()
                : theme.pallet.primary[50],
              borderColor: fillColor
                ? tinycolor(fillColor).darken(2).toString()
                : theme.pallet.primary[400],
              '&.Mui-checked': {
                borderColor: fillColor
                  ? tinycolor(fillColor).darken(2).toString()
                  : theme.pallet.primary[500],
                background: fillColor
                  ? tinycolor(fillColor).darken(2).toString()
                  : theme.pallet.primary[500],
              },
              '&.MuiCheckbox-indeterminate': {
                borderColor: fillColor
                  ? tinycolor(fillColor).darken(2).toString()
                  : theme.pallet.primary[500],
                background: fillColor
                  ? tinycolor(fillColor).darken(2).toString()
                  : theme.pallet.primary[500],
              },
            },
          }}
        />
        {label && (
          <P3
            text={label}
            color={theme.pallet.text.body}
            capitalizeFirstLetter
          />
        )}
      </Flex>
      {error && <InputError error={error} name={name} />}
    </Flex>
  );
}

export default withMuiThemeProvider<CheckboxPropsType>(Checkbox);

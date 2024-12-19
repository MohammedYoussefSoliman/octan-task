interface Configs {
  locale: Intl.LocalesArgument;
}

const localizedNumberFormatter = (
  value: string | number,
  configs: Configs | null = null,
) => {
  const locale = configs?.locale;
  const noCommasValue = value.toString().replaceAll(',', '');
  const originalValue = Number(noCommasValue);
  const newValue = originalValue.toLocaleString(locale || 'en-US');

  return newValue;
};

export default localizedNumberFormatter;

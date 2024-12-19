interface Configs {
  type?: 'hijri' | 'gregorian';
  localCode?: 'ar' | 'en';
  options?: Intl.DateTimeFormatOptions;
}

const localizedDateFormatter = (
  date: string | Date,
  configs: Configs | null = null,
): string => {
  let defaultConfigs: Required<Configs> = {
    type: 'gregorian',
    localCode: 'en',
    options: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  };
  if (configs) {
    defaultConfigs = {
      ...defaultConfigs,
      ...configs,
    };
  }
  const locales =
    defaultConfigs.type === 'hijri'
      ? `${defaultConfigs.localCode}-SA-u-ca-islamic`
      : `${defaultConfigs.localCode}-EG`;
  const currentDate = new Date(date);
  const currentOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...defaultConfigs.options,
  };
  return currentDate.toLocaleDateString(locales, currentOptions);
};

export default localizedDateFormatter;

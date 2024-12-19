const localizedStringToNumber = (value: string) => {
  const withoutCommas = value.replace(',', '');
  return Number(withoutCommas);
};

export default localizedStringToNumber;

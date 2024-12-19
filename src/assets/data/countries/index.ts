import dialCode from "./dialCodes.json";
import locales from "./locales.json";

function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const countries = locales.map((country) => ({
  ...country,
  dialCode: dialCode.find((ctry) => ctry.code === country.code)?.dialCode,
  flag: getFlagEmoji(country.code),
}));

export default countries;

const convertArabicDigitsToEnglish = (phrase: string) =>
  phrase.replace(/[\u0660-\u0669]/g, (d) => `${'٠١٢٣٤٥٦٧٨٩'.indexOf(d)}`);

export default convertArabicDigitsToEnglish;

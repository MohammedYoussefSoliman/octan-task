const firstLetter = (...args: string[]) => {
  if (!args) return '';
  if (!args.length) return '';
  if (args.length === 1) {
    return args[0].slice(0, 1).toUpperCase();
  }
  return args
    .map((word) => {
      const letter = word.slice(0, 1).toUpperCase();
      return letter;
    })
    .join('');
};
export default firstLetter;

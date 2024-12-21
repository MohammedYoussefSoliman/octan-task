import { isEmpty } from 'lodash';

const removeUndefinedErrors = (
  hasHistory: boolean,
  setHistory: (value: boolean) => void,
  errors?: any[],
) => {
  if (!errors && !hasHistory) return null;
  if (!errors && hasHistory) return [];
  if (errors) {
    setHistory(true);
    return errors
      .map((err) => {
        for (const key in err) {
          if (!err[key].ref) delete err[key];
        }
        return err;
      })
      .filter((reducedErr) => !isEmpty(reducedErr));
  }
  return null;
};

export default removeUndefinedErrors;

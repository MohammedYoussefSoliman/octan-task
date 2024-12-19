/* eslint-disable @typescript-eslint/no-explicit-any */
type ArraySplitter = {
  phrase: any[] | string;
  splitAt: number;
};

const worker = (
  originalPhrase: any[] | string,
  limit: number,
  updatedArray: any[],
): any[] => {
  let workLoad;
  if (typeof originalPhrase === 'string') {
    workLoad = [...originalPhrase.split('')];
  } else {
    workLoad = [...originalPhrase];
  }
  if (workLoad.length <= limit) {
    updatedArray.push([...workLoad]);
    return updatedArray;
  }

  updatedArray.push([...workLoad.slice(0, limit)]);
  return worker(workLoad.slice(limit), limit, updatedArray);
};

function splitter({ phrase, splitAt }: ArraySplitter): any[] {
  const result = worker(phrase, splitAt, []);
  if (typeof phrase === 'string') {
    return result.map((item) => item.join(''));
  }
  return result;
}

export default splitter;

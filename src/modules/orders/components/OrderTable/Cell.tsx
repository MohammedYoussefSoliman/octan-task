import _ from 'lodash';

import { CellType } from './types';

type Props = {
  cell: CellType;
};

export default function Cell({ cell }: Props) {
  let Content;

  if (_.isObject(cell)) {
    const { formatter, value } = cell;
    Content = formatter ? formatter(value) : value;
  } else {
    Content = cell;
  }

  return <td>{Content}</td>;
}

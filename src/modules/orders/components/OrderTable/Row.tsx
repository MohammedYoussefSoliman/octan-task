import Cell from './Cell';
import { TableElement } from './types';

type Props = {
  row: TableElement;
};

export default function Row({ row }: Props) {
  const keys = Object.keys(row);
  return (
    <tr>
      {keys.map((key) => (
        <Cell key={`row-${key}`} cell={row[key]} />
      ))}
    </tr>
  );
}

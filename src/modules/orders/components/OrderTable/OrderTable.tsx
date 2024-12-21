import { useTheme } from '@emotion/react';
import { v4 as uuidv4 } from 'uuid';

import { P2 } from '@/components/Typography';
import { useAppSelector } from '@/hooks';

import Row from './Row';
import { StyledTable, TableWrapper } from './styles';
import { TableElement } from './types';

type Props = {
  rows: TableElement[];
  headless?: boolean;
};

export default function OrderTable({ rows, headless }: Props) {
  const headers = Object.keys(rows[0]);
  const { pallet } = useTheme();
  const language = useAppSelector((state) => state.ui.language);

  return (
    <TableWrapper headless={headless}>
      <StyledTable dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {!headless && (
          <thead>
            <tr>
              {headers?.length &&
                headers.map((head) => (
                  <td key={head} aria-label={head}>
                    <P2
                      text={head}
                      weight={600}
                      color={pallet.text.heading}
                      capitalizeFirstLetter
                    />
                  </td>
                ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row) => (
            <Row key={uuidv4()} row={row} />
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
}

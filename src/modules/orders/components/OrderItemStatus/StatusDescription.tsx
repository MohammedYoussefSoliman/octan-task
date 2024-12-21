import { P2 } from '@/components/Typography';
import { RefundStatus } from '@/helpers/types';

import { StatusDescriptionWrapper } from '../styles';

type Props = {
  description: string | null;
  state: RefundStatus['state'];
  justify?: 'flex-start' | 'center' | 'flex-end';
};

export default function StatusDescription({
  description,
  state,
  justify = 'flex-start',
}: Props) {
  if (!description) return null;
  return (
    <StatusDescriptionWrapper
      p={{ xs: 8, md: 16 }}
      state={
        state === 'failure'
          ? 'failure'
          : state === 'success'
            ? 'success'
            : 'current'
      }
      fullWidth
      justify={justify}
    >
      <P2 className="text" text={description} capitalizeFirstLetter />
    </StatusDescriptionWrapper>
  );
}

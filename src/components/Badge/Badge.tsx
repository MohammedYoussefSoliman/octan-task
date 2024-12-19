import { Small, P3 } from '@/components/Typography';
import { StatusType } from '@/helpers/types';

import StyledBadge from './styles';

type Props = {
  status: StatusType;
  label?: string;
  isSmall?: boolean;
};

export default function Badge({ status, isSmall, label }: Props) {
  return (
    <StyledBadge isSmall={isSmall} status={status}>
      {isSmall ? (
        <Small className="label" text={label || status} weight={400} />
      ) : (
        <P3
          className="label"
          text={label || status}
          weight={400}
          capitalizeFirstLetter
        />
      )}
    </StyledBadge>
  );
}

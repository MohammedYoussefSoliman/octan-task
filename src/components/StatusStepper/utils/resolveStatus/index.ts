import { RefundStatus } from '@/helpers/types';

import { ReturnVariant } from '../../types';

const resolveStatus = (
  variant: RefundStatus['variant'],
  name: string,
  icon: string,
  statusText: string,
  statusState: RefundStatus['state'],
): ReturnVariant => {
  if (!variant)
    return {
      name,
      statusText,
      iconUrl: icon,
      state: statusState || null,
    };
  if (typeof variant === 'string')
    return {
      name: variant,
      iconUrl: icon,
      statusText,
      state: statusState || null,
    };
  return {
    name: variant.name,
    iconUrl: variant.icon,
    statusText: variant.statusText || statusText,
    state: variant.state || statusState || null,
  };
};

export default resolveStatus;

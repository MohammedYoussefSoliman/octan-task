import { CSSProperties } from 'react';

import StyledDivider from './style';

type Props = {
  color?: CSSProperties['color'];
};
export default function Divider({ color }: Props) {
  return <StyledDivider color={color} />;
}

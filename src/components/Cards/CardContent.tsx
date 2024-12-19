import { H6, P1 } from '@/components';

import { CardContentPaper } from './styles';

type Props = {
  title?: string;
  body?: string;
};

export default function CardContent({ title, body }: Props) {
  return (
    <CardContentPaper direction="column" fullWidth>
      <H6 text={title || 'cardSample'} capitalizeFirstLetter />
      <P1 text={body || 'this is card content'} />
    </CardContentPaper>
  );
}

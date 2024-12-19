import { Link, Logo } from '@/components';
import { useBreakpoints } from '@/hooks';

type Props = {
  color: 'white' | 'colored';
};

export default function HeaderLogo({ color }: Props) {
  const { large, xxLarge } = useBreakpoints();

  return (
    <Link to="/">
      <Logo color={color} size={xxLarge ? 144 : large ? 120 : 100} />
    </Link>
  );
}

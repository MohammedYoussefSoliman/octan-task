import { Flex, NavLink } from '@/components';
import navigationList from '@/helpers/headerNavigation';

type Props = {
  transparentMode: boolean;
};

export default function Navigation({ transparentMode }: Props) {
  return (
    <Flex as="ul" align="center" gap={{ xs: 15, md: 30, lg: 60 }}>
      {navigationList.map((nav) => (
        <li key={nav.label + nav.path}>
          <NavLink
            to={nav.path}
            variant={transparentMode ? 'transparent' : 'normal'}
          >
            {nav.label}
          </NavLink>
        </li>
      ))}
    </Flex>
  );
}

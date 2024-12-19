import React from 'react';

import { useTheme } from '@emotion/react';
import { NavLink, useLocation } from 'react-router-dom';

import { H6, P2 } from '@/components';

import { NavLinkTypeProps } from '../types';

export default function NavigationLink({
  to,
  children,
  variant = 'normal',
  mode = 'bar',
  hash,
  callback,
}: NavLinkTypeProps) {
  const { pathname } = useLocation();
  const { colors, pallet } = useTheme();
  const navStyle = React.useMemo(() => {
    return {
      active: variant === 'normal' ? pallet.primary[600] : colors.yellow[500],
      normal:
        mode === 'menu'
          ? pallet.text.heading
          : variant === 'normal'
            ? pallet.primary[500]
            : colors.shades[100],
    };
  }, [colors, pallet, variant, mode]);

  const Typography = mode === 'bar' ? P2 : H6;

  const navToSection = React.useCallback(() => {
    if (hash) {
      if (pathname === to) {
        window.location.href = hash;
      } else {
        setTimeout(() => {
          window.location.href = hash;
        }, 1000);
      }
    }
  }, [hash, to, pathname]);

  return (
    <NavLink
      onClick={() => {
        navToSection();

        if (callback) {
          setTimeout(callback, 0);
        }
      }}
      to={to}
    >
      {({ isActive }) => (
        <Typography
          hover={{
            decoration: 'underline',
          }}
          textDecoration={isActive ? 'underline' : undefined}
          color={isActive ? navStyle.active : navStyle.normal}
          capitalizeFirstLetter
          text={children}
          weight={500}
        />
      )}
    </NavLink>
  );
}

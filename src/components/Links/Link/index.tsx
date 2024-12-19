import React from 'react';

import { Link as RouterLink, useLocation } from 'react-router-dom';

import { P3 } from '@/components';

import { LinkTypeProps } from '../types';

const handleUrlsWithHash = (url: string) => {
  let hash = '';
  let path = '';
  if (url.includes('#')) {
    [path, hash] = url.split('#');
  } else {
    path = url;
  }

  return { path, hash };
};

export default function Link({
  color,
  callback,
  to,
  relative = true,
  target = '_blank',
  children,
}: LinkTypeProps) {
  let content;
  const { pathname } = useLocation();

  if (typeof children === 'string') {
    content = (
      <P3
        hover={{
          decoration: 'underline',
        }}
        color={color}
        capitalizeFirstLetter
        text={children}
      />
    );
  } else {
    content = children;
  }

  const { path, hash } = handleUrlsWithHash(to);
  const navToSection = React.useCallback(() => {
    if (hash) {
      if (pathname === to) {
        window.location.href = `#${hash}`;
      } else {
        setTimeout(() => {
          window.location.href = `#${hash}`;
        }, 800);
      }
    }
  }, [hash, to, pathname]);

  if (!relative) {
    return (
      <a
        href={path}
        onClick={() => {
          navToSection();
          if (callback) {
            callback();
          }
        }}
        target={target}
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }
  return (
    <RouterLink
      to={path}
      onClick={() => {
        navToSection();
        if (callback) {
          callback();
        }
      }}
    >
      {content}
    </RouterLink>
  );
}

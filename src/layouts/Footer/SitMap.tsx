import { useTheme } from '@emotion/react';

import { Flex, Link, H6, P3 } from '@/components';
import urls from '@/helpers/urls';
import { useAuth, useBreakpoints } from '@/hooks';

const sitemap = [
  {
    title: 'yamm',
    children: [
      {
        label: 'home',
        path: urls.home,
      },
      {
        label: 'about',
        path: urls.about,
      },
      {
        label: 'terms',
        path: urls.terms,
      },
      {
        label: 'privacyPolicy',
        path: urls.privacy,
      },
    ],
  },
  {
    title: 'consumers',
    children: [
      {
        label: 'login',
        path: urls.login,
      },
      {
        label: 'faqs',
        path: urls.faqs,
      },
    ],
  },
  {
    title: 'business',
    children: [
      {
        label: 'login',
        path: 'https://merchant.yamm.sa/',
        externl: true,
      },
      {
        label: 'increaseRevenue',
        path: urls.calculator,
      },
    ],
  },
];

export default function SitMap() {
  const { small } = useBreakpoints();
  const { colors } = useTheme();
  const { loggedIn } = useAuth();

  return (
    <Flex
      direction={small ? 'row' : 'column'}
      gap={{ xs: 24, md: 30, lg: 60 }}
      flex={1}
    >
      {sitemap.map((item) => (
        <Flex
          key={item.title}
          direction="column"
          gap={{ xs: 6, md: 12, lg: 24 }}
        >
          <Flex>
            <H6
              text={item.title}
              color={colors.shades[100]}
              fontSize={{ xs: '20px', sm: '22px' }}
              capitalizeFirstLetter
            />
          </Flex>
          <Flex gap="5px" direction="column">
            {loggedIn
              ? item.children
                  .filter((child) => child.label !== 'login')
                  .map((child) => (
                    <Link key={child.label + child.path} to={child.path}>
                      <P3
                        text={child.label}
                        hover={{ decoration: 'underline' }}
                        color={colors.shades[100]}
                        capitalizeFirstLetter
                      />
                    </Link>
                  ))
              : item.children.map((child) =>
                  child.externl ? (
                    <a
                      key={child.label + child.path}
                      href={child.path}
                      aria-label={child.label}
                    >
                      <P3
                        text={child.label}
                        hover={{ decoration: 'underline' }}
                        color={colors.shades[100]}
                        capitalizeFirstLetter
                      />
                    </a>
                  ) : (
                    <Link key={child.label + child.path} to={child.path}>
                      <P3
                        text={child.label}
                        hover={{ decoration: 'underline' }}
                        color={colors.shades[100]}
                        capitalizeFirstLetter
                      />
                    </Link>
                  ),
                )}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}

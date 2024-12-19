import React from 'react';

import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  IconButton,
  Drawer,
  Flex,
  Icon,
  NavLink,
  P2,
} from '@/components';
import navigationList from '@/helpers/headerNavigation';
import { useAppDispatch, useAppSelector, useAuth } from '@/hooks';
import { toggleLanguage } from '@/state/ui/slice';

type Props = {
  transparentMode: boolean;
};

export default function NavMenu({ transparentMode }: Props) {
  const { colors, pallet } = useTheme();
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.ui);
  const [openMenuDrawer, setOpenMenuDrawer] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const { t } = useTranslation('app');
  const { loggedIn } = useAuth();

  return (
    <>
      <IconButton
        variant="transparent"
        icon="menu"
        iconColor={transparentMode ? colors.shades[100] : pallet.primary[500]}
        iconSize={24}
        onClick={() => setOpenMenuDrawer(true)}
        size="sm"
      />
      <Drawer open={openMenuDrawer} onClose={() => setOpenMenuDrawer(false)}>
        <Flex mt="32px !important" as="ul" direction="column" gap="30px">
          {navigationList.map((nav) => (
            <li key={nav.label + nav.path}>
              <NavLink
                to={nav.path}
                callback={() => setOpenMenuDrawer(false)}
                mode="menu"
              >
                {nav.label}
              </NavLink>
            </li>
          ))}
        </Flex>
        {!loggedIn && (
          <Flex mt="48px" direction="column" gap="24px" fullWidth>
            <Button
              onClick={() =>
                dispatch(toggleLanguage(language === 'en' ? 'ar' : 'en'))
              }
              variant="light"
              size="md"
              fullWidth
            >
              <Flex align="center" gap={{ xs: 8, md: 12, lg: 24 }}>
                <Icon
                  name={language === 'en' ? 'language-ltr' : 'language-rtl'}
                  size={18}
                />
                <P2 text={t('changeLanguage')} />
              </Flex>
            </Button>
            <Flex width="100%" gap={12}>
              <Button
                onClick={() => navigate('/login')}
                variant="secondary"
                size="md"
                fullWidth
              >
                <Flex gap={4}>
                  <Icon name="user" size={20} />
                  {language === 'en'
                    ? `${t('clientLoginButton')} ${t('login')}`
                    : `${t('login')} ${t('clientLoginButton')}`}
                </Flex>
              </Button>
              <Button
                onClick={() => {
                  window.location.href = 'https://merchant.yamm.sa/';
                }}
                variant="secondary"
                size="md"
                fullWidth
              >
                <Flex gap={4}>
                  <Icon name="business" size={20} />
                  {language === 'en'
                    ? `${t('businessLoginButton')} ${t('login')}`
                    : `${t('login')} ${t('businessLoginButton')}`}
                </Flex>
              </Button>
            </Flex>
          </Flex>
        )}
      </Drawer>
    </>
  );
}

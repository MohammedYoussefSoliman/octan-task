import React from 'react';

import { useTheme } from '@emotion/react';
import { useClickAway } from '@uidotdev/usehooks';
import { useWindowScroll } from 'react-use';

import { Flex } from '@/components/Grids';
import { P3 } from '@/components/Typography';
import { useAuth, useBreakpoints } from '@/hooks';

import LoginMenu from './LoginMenu/LoginMenu';
import { LoginButton, LoginButtonContainer } from './LoginMenu/styles';
import ToggleLanguage from './ToggleLanguage';

type Props = {
  transparentMode: boolean;
  scrolledView: boolean;
};

export default function GuestUser({ transparentMode, scrolledView }: Props) {
  const { loggedIn } = useAuth();
  const { medium } = useBreakpoints();
  const { colors, pallet } = useTheme();

  const isAboutPage = window.location.pathname === '/about';
  const isOrederPage = window.location.pathname === '/create-order';

  const [activeLoginButton, setActiveLoginButton] =
    React.useState<boolean>(false);
  const { y } = useWindowScroll();
  const [currentY, setCurrentY] = React.useState(y);

  const ref = useClickAway<HTMLDivElement>(() => {
    setActiveLoginButton(false);
  });

  React.useEffect(() => {
    if (currentY < y || currentY > y) {
      setCurrentY(y);
      setActiveLoginButton(false);
    }
  }, [currentY, y]);

  return (
    <Flex ref={ref} align="center" gap={{ xs: 6, md: 12, lg: 24 }} fullHeight>
      {medium && (
        <LoginButtonContainer>
          {!loggedIn && (
            <LoginButton
              onClick={() => setActiveLoginButton(true)}
              variant="secondary"
              color={transparentMode ? colors.shades[100] : undefined}
              size="sm"
            >
              <P3
                color={
                  scrolledView || isAboutPage || isOrederPage
                    ? pallet.primary[600]
                    : colors.shades[100]
                }
              >
                login
              </P3>
            </LoginButton>
          )}
          {activeLoginButton && (
            <LoginMenu state={activeLoginButton ? 'show' : 'hide'} />
          )}
        </LoginButtonContainer>
      )}
      <ToggleLanguage transparentMode={transparentMode} />
    </Flex>
  );
}

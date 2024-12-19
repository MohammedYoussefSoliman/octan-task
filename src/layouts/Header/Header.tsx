import { Container, Flex } from "components/Grids";
import { useAppSelector, useBreakpoints } from "hooks";
import React from "react";
import HeaderLogo from "../LayoutLogo";
import ActionBar from "./Actions";
import Navigation from "./Navigation";
import NavMenu from "./NavMenu";
import Wrapper from "./styles";

export default function Header() {
  const { headerVariant } = useAppSelector((state) => state.ui);
  const { medium } = useBreakpoints();
  const [scrolledView, setScrolledView] = React.useState<boolean>(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 30) {
      setScrolledView(true);
    } else if (scrolled <= 30) {
      setScrolledView(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
  }, []);

  return (
    <Wrapper
      scrolled={scrolledView}
      variant={headerVariant}
      as="header"
      align="center"
      justify="center"
      fullWidth
    >
      <Container width="extraWide">
        <Flex
          as="nav"
          gap={{ xs: 6, md: 12, lg: 24 }}
          align="center"
          justify="space-between"
          fullWidth
        >
          {medium ? (
            <HeaderLogo
              color={
                headerVariant === "transparent" && !scrolledView
                  ? "white"
                  : "colored"
              }
            />
          ) : (
            <Flex
              as="nav"
              gap={{ xs: 6, md: 12, lg: 24 }}
              align="center"
              fullWidth
            >
              <NavMenu
                transparentMode={
                  headerVariant === "transparent" && !scrolledView
                }
              />
              <HeaderLogo
                color={
                  headerVariant === "transparent" && !scrolledView
                    ? "white"
                    : "colored"
                }
              />
            </Flex>
          )}
          {medium && (
            <Navigation
              transparentMode={headerVariant === "transparent" && !scrolledView}
            />
          )}
          <ActionBar
            transparentMode={headerVariant === "transparent" && !scrolledView}
            scrolledView={scrolledView}
          />
        </Flex>
      </Container>
    </Wrapper>
  );
}

import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import tinyColor from 'tinycolor2';

import images from '@/assets/images';
import { Flex } from '@/components/Grids';
import devices from '@/theme/sizes';

const floatingAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Wrapper = styled(Flex)`
  label: home-wrapper;
  width: 100%;
  .hero--section {
    width: 100%;
    min-height: 100vh;
    ${({ theme: { branding } }) => css`
      background-image: ${branding.isEnabled && branding.backgroundImage
        ? `url(${branding.backgroundImage})`
        : `url(${images.HERO_BG})`};
    `}
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    ${devices.md} {
      padding-bottom: 30px;
    }
  }
  .hero--logged {
    padding-bottom: 24px;
    width: 100%;
    ${devices.md} {
      padding-bottom: 30px;
    }
  }
`;

export const HeroContent = styled(Flex)`
  label: hero-content;
  ${({ theme }) => css`
    border-bottom: 3px solid
      ${tinyColor(theme.colors.shades[100]).setAlpha(0.3).toString()};
  `}
`;

export const WelcomeSticker = styled(Flex)`
  label: welcome-sticker;
  padding: 8px 20px;
  border-radius: 50px;
  backdrop-filter: blur(50px);
  ${({ theme }) => css`
    background: ${theme.gradients[5]};
    border: 1px solid
      ${tinyColor(theme.colors.shades[100]).setAlpha(0.5).toString()};
  `}
`;

export const HowToCard = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  ${devices.sm} {
    width: 310px;
    height: 310px;
  }
  ${devices.md} {
    width: 320px;
    height: 320px;
  }
  ${devices.lg} {
    width: 350px;
    height: 350px;
  }
  ${devices.xxl} {
    width: 380px;
    height: 380px;
  }
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Tutor = styled(Flex)`
  label: tutor-wrapper;
  background-image: url(${images.TUTOR_BG});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  .tutor--content {
    margin-top: -290px;
    ${devices.md} {
      margin-top: -400px;
    }
  }
  .instant--img {
    width: 100%;
    object-fit: cover;
  }
  .order {
    width: 220px;
    height: 1px;
    ${({ theme }) => css`
      background-color: ${theme.colors.yellow[500]};
    `}
  }
`;

export const RefundFormContainer = styled(Flex)`
  label: refund-form-container;
  ${devices.md} {
    animation: ${floatingAnimation} 3s ease-in-out infinite;
  }
`;

export const Image = styled.img<{ width?: number }>`
  label: image;
  width: ${({ width }) => (width ? width / 2.5 : 80)}px;
  object-fit: contain;
  transition: transform 0.15s ease-in-out;
  &:hover {
    transform: scale(1.01);
  }

  ${devices.md} {
    width: ${({ width }) => (width ? width / 1.9 : 160)}px;
  }

  ${devices.lg} {
    width: ${({ width }) => width || 180}px;
  }
`;

export const Link = styled.a`
  label: link;
  height: 120px;
  width: 150px;
  ${devices.md} {
    width: 200px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const fadeIn = keyframes`
  from { opacity: 0 }
  to  { opacity: 1 }
`;

export const MarqueeContainer = styled.div`
  label: marquee-container;
  width: 100%;
  animation-name: ${fadeIn};
  animation-duration: 1s;
  animation-delay: 0.5s;
  animation-fill-mode: both;
`;

export default Wrapper;

export const MarqueeWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
  height: 80px;
`;

export const LogoImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

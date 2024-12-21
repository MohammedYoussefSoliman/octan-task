import { css } from '@emotion/react';
import styled from '@emotion/styled';

import images from '@/assets/images';
import { Flex, Paper } from '@/components';
import devices from '@/theme/sizes';

const Wrapper = styled(Flex)`
  label: business-wrapper;
  width: 100%;
  .hero--section {
    padding-bottom: 15px;
    width: 100%;
    min-height: 100vh;
    background-image: url(${images.HERO_BG});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .hero--logged {
    padding-bottom: 24px;
    width: 100%;
    ${devices.md} {
      padding-bottom: 30px;
    }
  }

  .white--section {
    ${({ theme }) => css`
      background: ${theme.gradients[6]};
    `}
  }
`;

export const JoinUsContainer = styled(Flex)`
  label: join-us-container;
  position: relative;
  border-radius: 16px;
  padding: 15px;
  width: 100%;
  ${({ theme }) => css`
    background: ${theme.gradients[6]};
  `}
  ${devices.md} {
    border-radius: 21px;
    padding: 24px;
    max-width: 500px;
  }
  ${devices.lg} {
    border-radius: 24px;
  }
  ${devices.xl} {
    border-radius: 30px;
    padding: 32px;
  }
  .title {
    margin-top: 30px;
    ${devices.lg} {
      margin-top: 10px;
    }
    ${devices.hd} {
      margin-top: 15px;
    }
  }
  .sticker {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }
`;

export const CalculatorContainer = styled(Flex)`
  label: calculator-container;
  .form--wrapper {
    position: relative;
    border-radius: 7px;
    ${({ theme }) => css`
      background: ${theme.gradients[6]};
    `}
  }

  .calculate--button {
    width: 526px;
  }
  .calculator--item {
    border-radius: 7px;
    background: rgba(230, 69, 77, 0.2);
    padding: 18px 9px;

    ${devices.md} {
      padding: 0;
      background: transparent;
    }
  }
  form {
    width: 100%;
  }
`;

export const Figure = styled.div`
  label: join-us-figure;
  height: 65px;
  width: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 200px;

  ${({ theme }) => css`
    background: ${theme.gradients.info};
  `}

  ${devices.md} {
    height: 70px;
    width: 70px;
  }

  ${devices.xl} {
    height: 75px;
    width: 75px;
  }
`;

export const TrustedLogo = styled.div`
  width: 125px;
  margin-bottom: 15px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  ${devices.sm} {
    width: 140px;
    margin-bottom: 20px;
  }

  ${devices.md} {
    width: 200px;
  }

  ${devices.lg} {
    margin-bottom: 0;
  }
`;

export const Banner = styled(Flex)`
  width: 100%;
  ${({ theme }) => css`
    background: ${theme.gradients[6]};
  `}
  width: 320px;
  ${devices.md} {
    width: 500px;
  }

  ${devices.lg} {
    width: 900px;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;

export const AdvantagesGrid = styled.div`
  label: advantage-grid;
  display: flex;
  flex-direction: column;
  gap: 60px;
  align-items: start;

  ${devices.sm} {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 86px 60px;
  }

  ${devices.md} {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .icon {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    ${({ theme }) => css`
      background: ${theme.colors.shades[200]};
    `}

    img {
      height: 40px;
      width: 40px;
    }
  }
`;

export const TheFigurePaper = styled(Paper)`
  label: figure-paper;
  .item-description {
    ${devices.xs} {
      width: 230px;
    }

    ${devices.sm} {
      width: 300px;
    }

    ${devices.md} {
      width: 100%;
    }
  }
`;

export const HowItWorksItem = styled(Flex)`
  label: business-how-it-works-item;
  .card {
    overflow: hidden;
    width: 100%;
    ${devices.sm} {
      width: 315px;
    }
    ${devices.md} {
      width: 400px;
    }
    .image {
      width: 100%;
    }
  }

  .caption-container {
    ${devices.lg} {
      width: 500px;
    }
  }

  .sequence {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    ${({ theme }) => css`
      background: ${theme.colors.purple[500]};
    `}

    ${devices.md} {
      width: 50px;
      height: 50px;
    }
    ${devices.lg} {
      width: 60px;
      height: 60px;
    }
  }
`;

export default Wrapper;

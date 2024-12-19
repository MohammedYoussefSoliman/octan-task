import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/components';
import devices from '@/theme/sizes';
// import { css } from "@emotion/react";

export const Wrapper = styled(Flex)`
  position: relative;
  height: 350px;
  ${devices.md} {
    /* height: 100%; */
  }
`;

export const NavigationWrapper = styled(Flex)`
  position: absolute;
  width: 100%;
  height: 100%;
  .next--button {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    z-index: 1000;
  }
  .back--button {
    z-index: 1000;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
  }
`;

export const ImageWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
`;

export const Image = styled.img`
  width: 80%;
  height: 100%;
  object-fit: contain;
`;

export const GalleryButtonWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-template-rows: repeat(6, 80px);
  gap: 8px;
  max-height: 600px;
  overflow-y: auto;
`;
export const GalleryButton = styled.button`
  all: unset;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${({ theme }) => css`
    background-color: ${theme.pallet.primary[100]};
    border: 1px solid ${theme.pallet.primary[400]};
  `}
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
  }
  &:hover::before {
    background-color: rgba(61, 34, 147, 0.25);
  }
`;

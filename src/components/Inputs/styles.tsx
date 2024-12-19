import { CSSProperties } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Flex } from '@/components/Grids';
import devices from '@/theme/sizes';

type InputWrapperProps = {
  variant?: 'outlined' | 'filled';
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  error?: boolean;
  rounded?: boolean;
  dense?: boolean;
  borderless?: boolean;
  color?: CSSProperties['color'];
};

type InputProps = {
  variant?: 'outlined' | 'filled';
  adornment?: boolean;
  dense?: boolean;
  error?: boolean;
};

export const Wrapper = styled(Flex)<InputWrapperProps>`
  position: relative;
  border-radius: 10px;
  padding: 12px 16px;
  height: 50px;
  width: 100%;
  min-width: 100%;
  outline: none;
  overflow: visible;
  ${({ theme }) => css`
    background: ${theme.colors.shades[100]};
  `}
  ${({ rounded }) =>
    rounded &&
    css`
      border-radius: 100px;
    `}
  .MuiSvgIcon-root {
    width: 28px;
    height: 28px;
    ${({ theme, color }) => css`
      color: ${color ?? theme.pallet.primary[600]};
    `}
  }
  &:focus-within {
    ${({ theme: { pallet, branding }, color }) => css`
      outline: 2px solid
        ${color ?? branding.primaryColor ?? pallet.primary[700]};
    `}
  }
  ${({ variant, theme }) =>
    variant === 'filled'
      ? css`
          border: none;
        `
      : css`
          border: 1px solid ${theme.colors.grey[300]};
        `}
  &:hover {
    ${({ theme, error }) =>
      error
        ? css`
            background: ${theme.colors.error[100]};
          `
        : css`
            background: ${theme.colors.shades[200]};
          `}
  }
  ${({ borderless }) =>
    borderless &&
    css`
      border: none;
    `}
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
  ${({ error, theme }) =>
    error &&
    css`
      border: 1px solid ${theme.colors.error[300]};
      &:focus-within {
        outline: 2px solid ${theme.colors.error[300]};
      }
      .MuiSvgIcon-root {
        color: ${theme.pallet.text.error};
      }
    `}

  ${({ height }) =>
    height &&
    css`
      height: ${height} !important;
    `}

  ${({ dense }) =>
    dense &&
    css`
      height: 30px;
      padding: 6px 10px;
      ${devices.md} {
        height: 32px;
        padding: 8px 16px;
      }
      ${devices.lg} {
        height: 36px;
        padding: 8px 16px;
      }
      ${devices.xl} {
        height: 40px;
        padding: 8px 16px;
      }
    `}
`;

export const Input = styled('input')<InputProps>`
  flex: 1;
  background: transparent;
  outline: none;
  border: none;
  height: 100%;
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  ${({ theme }) => css`
    color: ${theme.pallet.text.heading};
  `}
  ${({ adornment }) =>
    adornment &&
    css`
      max-width: 85%;
    `}
  &::placeholder {
    font-family: inherit;
    ${({ theme }) => css`
      color: ${theme.pallet.text.body};
      font-size: 14px;
      font-weight: 300;
    `}
  }

  ${({ error, theme }) =>
    error &&
    css`
      &::placeholder {
        color: ${theme.pallet.text.error};
      }
    `}
  ${devices.lg} {
    font-size: 18px;
  }
  ${({ dense }) =>
    dense &&
    css`
      font-size: 12px;
      ${devices.lg} {
        font-size: 14px;
      }
    `}
`;

export const Label = styled('label')`
  display: inline;
  .label--paragraph {
    display: inline;
  }
`;

export const AreaInput = styled('textarea')<InputProps>`
  flex: 1;
  height: 100%;
  background: transparent;
  overflow-y: auto;
  border: none;
  outline: none;
  resize: none;
  font-size: 16px;
  ${({ theme }) => css`
    color: ${theme.pallet.text.heading};
  `}

  ${({ adornment }) =>
    adornment &&
    css`
      max-width: 85%;
    `}
  &::placeholder {
    ${({ theme }) => css`
      color: ${theme.pallet.text.body};
    `}
  }

  ${({ error, theme }) =>
    error &&
    css`
      &::placeholder {
        color: ${theme.pallet.text.error};
      }
    `}
  ${devices.lg} {
    font-size: 18px;
  }
`;

export const Sup = styled.sup`
  ${({ theme }) => css`
    display: inline;
    color: ${theme.colors.red[700]};
    weight: 600;
    font-size: 16px;
  `}
`;

type FileInputWrapperProps = {
  error?: boolean;
  loaded?: boolean;
  loading?: boolean;
};

export const ImageWrapper = styled(Flex)<FileInputWrapperProps>`
  label: image-input-wrapper;
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  ${({ loaded, theme }) =>
    loaded
      ? css`
          border: none;
        `
      : css`
          border: 1px solid ${theme.pallet.primary[400]};
        `}
  ${({ error, theme }) =>
    error &&
    css`
      border: 1px solid ${theme.colors.error[300]};
    `}
  ${({ loading, theme }) =>
    loading &&
    css`
      background: ${theme.colors.shades[200]};
    `}
  ${devices.md} {
    border-radius: 15px;
    width: 300px;
  }
  ${devices.lg} {
    border-radius: 20px;
  }
  .input {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .remove--button {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1000;
  }
  &:hover {
    ${({ theme }) => css`
      background-color: ${theme.colors.shades[200]};
    `}
  }
`;
export const SlimImageWrapper = styled(Flex)<FileInputWrapperProps>`
  label: slim-image-input-wrapper;
  position: relative;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  overflow: hidden;
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.grey[300]};
    background: ${theme.colors.shades[100]};
  `}
  ${({ error, theme }) =>
    error &&
    css`
      border: 1px solid ${theme.colors.error[300]};
    `}
  ${({ loading, theme }) =>
    loading &&
    css`
      background: ${theme.colors.shades[200]};
    `}
  ${devices.md} {
    border-radius: 8px;
    width: 300px;
  }
  .input {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  .preview--wrapper {
    width: 36px;
    height: 36px;
    border-radius: 5px;
    overflow: hidden;
    ${({ theme, error }) => css`
      border: 1px solid
        ${error ? theme.colors.error[300] : theme.pallet.primary[500]};
    `}
  }
  .preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .remove--button {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1000;
    ${({ theme }) => css`
      border: 1px solid ${theme.colors.error[300]};
    `}
  }
  &:hover {
    ${({ theme }) => css`
      background-color: ${theme.pallet.primary[50]};
    `}
  }
`;

export const LargeImageWrapper = styled(Flex)<FileInputWrapperProps>`
  label: large-image-input-wrapper;
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: 5px;
  overflow: hidden;
  ${({ theme, loaded }) =>
    loaded
      ? css`
          height: 100%;
        `
      : css`
          border: 1px solid ${theme.colors.purple[500]};
          background: ${theme.colors.shades[100]};
        `}
  ${({ error, theme }) =>
    error &&
    css`
      border: 2px solid ${theme.colors.error[300]};
    `}
  ${({ loading, theme }) =>
    loading &&
    css`
      border: 1px solid ${theme.colors.grey[300]};
      background: ${theme.colors.shades[200]};
    `}
  ${devices.md} {
    border-radius: 8px;
    width: 150px;
  }
  .input {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  .preview--wrapper {
    width: 36px;
    height: 36px;
    border-radius: 5px;
    overflow: hidden;
    ${({ theme: { pallet, colors, branding }, error }) => css`
      border: 1px solid
        ${error
          ? colors.error[300]
          : (branding.primaryColor ?? pallet.primary[500])};
    `}
  }
  .preview {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    object-fit: cover;
  }
  .remove--button {
    position: absolute;
    bottom: 10px;
    left: 10px;
    z-index: 1000;
    ${({ theme, loaded }) => css`
      border: 1px solid ${theme.colors.shades[100]};
      background: ${loaded ? theme.colors.error[300] : theme.colors.grey[100]};
    `}
  }
  &:hover {
    ${({ theme }) => css`
      background-color: ${theme.pallet.primary[50]};
    `}
  }
`;

export const TextArea = styled('textarea')<InputProps>`
  flex: 1;
  background: transparent;
  outline: none;
  border: none;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  resize: none;
  font-size: 16px;
  font-family: inherit;
  ${({ theme }) => css`
    color: ${theme.pallet.text.heading};
  `}
  ${({ adornment }) =>
    adornment &&
    css`
      max-width: 85%;
    `}
  &::placeholder {
    ${({ theme }) => css`
      color: ${theme.pallet.text.body};
      font-size: 14px;
      font-weight: 300;
    `}
  }
  ${({ error, theme }) =>
    error &&
    css`
      &::placeholder {
        color: ${theme.pallet.text.error};
      }
    `}
  ${devices.lg} {
    font-size: 18px;
  }
  ${({ dense }) =>
    dense &&
    css`
      font-size: 12px;
      ${devices.lg} {
        font-size: 14px;
      }
    `}
`;

export const AreaWrapper = styled(Wrapper)`
  label: textarea-wrapper;
  height: 100px;
  ${devices.md} {
    height: 100px;
    width: 411px;
  }
  ${devices.lg} {
    height: 150px;
    width: 411px;
  }
`;

/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { useTheme } from '@emotion/react';
import { isEmpty, get as lodashGet } from 'lodash';

import { Icon, Spinner } from '@/components';
import { useAppDispatch } from '@/hooks';
import { showError } from '@/state';

import InputError from '../InputError';
import Label from '../InputLabel';

import EmptyFile from './Empty';
import {
  ImageWrapper,
  FileInput as Input,
  PositionedFlex,
  ThumbWrapper,
} from './styles';
import { FileInputPropsType } from './types';

const convertByteToMib = (size: number): number => size / 1024 / 1024;

export default function FileInput({
  name,
  label,
  type,
  className,
  required,
  onChange,
  fileUrl,
  file: currentFile,
  accepts,
  setValue,
  uploadAction,
  deleteAction,
  disabled,
  setError,
  clearErrors,
  error,
  hideWhileDisabled,
  ...InputProps
}: FileInputPropsType) {
  const dispatch = useAppDispatch();

  const { colors } = useTheme();

  const isProduction = process.env.NODE_ENV === 'production';

  const [loading, setLoading] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<FileList | null>(null);
  const [fileId, setFileId] = React.useState<string>('');

  const handleFileChange = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      try {
        if (e.target.files) {
          const size = convertByteToMib(e.target.files[0].size);
          const validSize = isProduction ? 25 : 4;
          if (size > validSize) {
            setError(name, { type: 'largeSize', message: 'mediaIsTooLarge' });
            return;
          }
          clearErrors(name);
          setFile(e.target.files);
          setLoading(true);
          const response = await uploadAction(e.target.files[0]);
          const id = lodashGet(response, 'data.records.id');
          const url = lodashGet(response, 'data.records.original_url', '');
          setValue(name, { id, file: e.target.files[0], url });
          setFileId(id);
        }
      } catch (resPonseError) {
        if ((resPonseError as any).response?.data) {
          dispatch(
            showError(
              (resPonseError as any).response?.data?.errors[0]?.message,
            ),
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [
      clearErrors,
      dispatch,
      isProduction,
      name,
      setError,
      setValue,
      uploadAction,
    ],
  );

  const resolvePreview = React.useCallback((): string | null => {
    if (file && !isEmpty(file)) {
      const fileType = file[0].type;
      if (fileType.includes('image')) {
        return 'image';
      }
      if (fileType.includes('video')) {
        return 'video';
      }
    }
    return null;
  }, [file]);

  const handleDelete = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setValue(name, undefined);
    setFile(null);
    try {
      if (currentFile) {
        await deleteAction(currentFile.id);
      } else if (fileId) {
        await deleteAction(fileId);
      }
    } catch (resPonseError) {
      if ((resPonseError as any).response?.data) {
        dispatch(
          showError((resPonseError as any).response?.data?.errors[0]?.message),
        );
      }
    }
  };

  return (
    <PositionedFlex position="relative" direction="column" gap={{ xs: 8 }}>
      {label && <Label label={label} required={required} />}
      {!disabled && hideWhileDisabled && (
        <PositionedFlex
          position="relative"
          width={{ xs: '88px' }}
          height={{ xs: '88px' }}
          align="center"
          justify="center"
        >
          <Input
            type="file"
            disabled={disabled}
            onChange={handleFileChange}
            accept={accepts ? accepts.join(',') : undefined}
            {...InputProps}
          />
          {isEmpty(currentFile) && file === null ? (
            <EmptyFile disabled={disabled} />
          ) : (
            <ImageWrapper>
              {(!isEmpty(currentFile) || file) && (
                <button
                  type="button"
                  className="delete--button"
                  aria-label="delete file"
                  onClick={handleDelete}
                >
                  <Icon name="times" color={colors.dark[200]} size={16} />
                </button>
              )}
              {loading && (
                <PositionedFlex
                  position="absolute"
                  align="center"
                  justify="center"
                  fullHeight
                  fullWidth
                  className="loading"
                >
                  <Spinner
                    bottomColor="transparent"
                    topColor={colors.shades[100]}
                    size={20}
                  />
                </PositionedFlex>
              )}

              <ThumbWrapper>
                {file && resolvePreview() === 'image' ? (
                  <img
                    className="thumb"
                    src={URL.createObjectURL(file[0])}
                    alt="image_thumb"
                  />
                ) : file && resolvePreview() === 'video' ? (
                  <video
                    className="thumb"
                    src={URL.createObjectURL(file[0])}
                    controls
                  />
                ) : fileUrl ? (
                  <img src={fileUrl} className="thumb" alt={name} />
                ) : currentFile?.url ? (
                  <img src={currentFile?.url} className="thumb" alt={name} />
                ) : null}
              </ThumbWrapper>
            </ImageWrapper>
          )}
        </PositionedFlex>
      )}
      {error && <InputError error={error} />}
    </PositionedFlex>
  );
}

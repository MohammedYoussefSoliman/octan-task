import React from 'react';

import { useTheme } from '@emotion/react';
import { isEmpty, get as lodashGet } from 'lodash';

import { IconButton, Flex, Spinner, P1, Icon } from '@/components';
import { formDataHandler } from '@/helpers/functions';
import { useAxiosInstance, useAppDispatch } from '@/hooks';
import { showError } from '@/state';

import InputError from '../InputError';
import InputLabel from '../InputLabel';
import { ImageWrapper } from '../styles';
import { FileInputPropsType } from '../types';

export default function BaseFileInput({
  name,
  label,
  error,
  className,
  required,
  onChange,
  url,
  changeHandler,
  accepts,
  setValue,
  setError,
  section,
  ...InputProps
}: FileInputPropsType) {
  const { pallet, colors } = useTheme();
  const dispatch = useAppDispatch();
  const { post } = useAxiosInstance();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [imageFile, setImageFile] = React.useState<FileList | null>(null);
  const [fileId, setFileId] = React.useState<string>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files);
    setLoading(true);

    if (e.target.files) {
      if (e.target.files[0].size > 100000000) {
        setLoading(false);
        setImageFile(null);
        if (setError) {
          setError(name, {
            type: 'custom',
            message: 'fileSizeError',
          });
        }
        return;
      }
    }

    try {
      let sectionObj = {};
      if (section) {
        sectionObj = { ...sectionObj, section_name: section };
      }
      const response = await post(
        'upload-file',
        formDataHandler({
          file: e.target.files ? e.target.files[0] : null,
          ...sectionObj,
        }),
      );
      const id = lodashGet(response.data, 'records.id', undefined);
      setFileId(lodashGet(response.data, 'records.id', undefined));

      setValue(name, id);
      if (onChange) onChange(id);
      if (changeHandler) changeHandler(id);
    } catch (resPonseError) {
      if ((resPonseError as any).response?.data) {
        dispatch(showError((error as any).response?.data?.errors[0]?.message));
        if (setError) {
          setError(name, {
            type: 'server',
            message: (error as any).response?.data?.errors[0]?.message,
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const resolvePreview = (): string | null => {
    if (imageFile && !isEmpty(imageFile)) {
      const fileType = imageFile[0].type;
      if (fileType.includes('image')) {
        return 'image';
      }
      if (fileType.includes('video')) {
        return 'video';
      }
    }
    return null;
  };

  const handleDelete = async () => {
    setValue(name, undefined);
    setImageFile(null);
    try {
      await post(`delete-file/${fileId}`);
    } catch (resPonseError) {
      if ((resPonseError as any).response?.data) {
        dispatch(showError((error as any).response?.data?.errors[0]?.message));
      }
    }
  };

  return (
    <Flex
      className={className}
      width={{ xs: '100%', md: 'auto' }}
      direction="column"
      gap={{ xs: 5, md: 8 }}
    >
      {label && <InputLabel label={label} required={required} />}
      {loading ? (
        <ImageWrapper loading={loading}>
          <Flex fullHeight fullWidth align="center" justify="center">
            <Spinner
              bottomColor={colors.grey[100]}
              topColor={colors.grey[300]}
            />
          </Flex>
        </ImageWrapper>
      ) : (
        <ImageWrapper
          className="input--wrapper"
          error={!!error}
          align="center"
          justify="space-between"
        >
          <input
            className="input"
            type="file"
            onChange={handleFileChange}
            accept={accepts ? accepts.join(',') : undefined}
            {...InputProps}
          />
          {imageFile && (
            <IconButton
              className="remove--button"
              icon="remove"
              size="sm"
              variant="light"
              color={pallet.text.error}
              iconColor={pallet.text.error}
              onClick={handleDelete}
            />
          )}

          {imageFile && resolvePreview() === 'image' ? (
            <img
              className="preview"
              src={URL.createObjectURL(imageFile[0])}
              alt="preview"
            />
          ) : imageFile && resolvePreview() === 'video' ? (
            <video
              className="preview"
              src={URL.createObjectURL(imageFile[0])}
              controls
            />
          ) : url ? (
            <img className="preview" src={url} alt="preview" />
          ) : (
            <Flex gap={10} align="center" justify="center" fullHeight fullWidth>
              <Icon name="attachment" color={pallet.primary[500]} />
              <P1 text="attachFile" color={pallet.primary[500]} />
            </Flex>
          )}
        </ImageWrapper>
      )}
      {error && <InputError error={error} name={name} />}
    </Flex>
  );
}

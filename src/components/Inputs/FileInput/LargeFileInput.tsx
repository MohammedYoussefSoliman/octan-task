import React from 'react';

import { useTheme } from '@emotion/react';
import { isEmpty, get as lodashGet } from 'lodash';
import { useFormContext } from 'react-hook-form';

import { IconButton, Flex, Spinner, P3, Logo } from '@/components';
import { formDataHandler } from '@/helpers/functions';
import { useAxiosInstance, useAppDispatch } from '@/hooks';
import { showError } from '@/state';

import InputError from '../InputError';
import InputLabel from '../InputLabel';
import { LargeImageWrapper } from '../styles';
import { FileInputPropsType } from '../types';

export default function LargeFileInput({
  name,
  label,
  error,
  className,
  required,
  onChange,
  url,
  changeHandler,
  accepts,
  section,
  setValue,
  setError,
  ...InputProps
}: FileInputPropsType) {
  const { pallet, colors } = useTheme();
  const { getValues } = useFormContext();
  const dispatch = useAppDispatch();
  const { post, delete: del } = useAxiosInstance();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [imageFile, setImageFile] = React.useState<FileList | null>(
    getValues(`${name}-file`) || null,
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files);
    setLoading(true);

    if (e.target.files) {
      if (e.target.files[0].size > 10000000) {
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
      setValue(`${name}-file`, e.target.files);
      const response = await post(
        'upload-file',
        formDataHandler({
          file: e.target.files ? e.target.files[0] : null,
          ...sectionObj,
        }),
      );
      const id = lodashGet(response.data, 'records.id', undefined);
      // const originalUrl = lodashGet(
      //   response.data,
      //   "records.original_url",
      //   undefined,
      // );

      setValue(name, id);
      if (onChange) onChange(id);
      if (changeHandler) changeHandler(id);
    } catch (resPonseError) {
      if (setError) {
        setError(name, {
          type: 'custom',
          message: (resPonseError as any).response?.data?.errors[0]?.message,
        });
      }
      if ((resPonseError as any).response?.data) {
        dispatch(
          showError((resPonseError as any).response?.data?.errors[0]?.message),
        );
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
    try {
      const fileId = getValues(name);
      if (fileId) {
        await del(`delete-file/${fileId}`);
      }
      setImageFile(null);
      setValue(name, undefined);
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
      gap={{ xs: 6 }}
    >
      <P3 text="illustrativeImage" color={pallet.text.heading} />
      {label && <InputLabel label={label} required={required} />}
      {loading ? (
        <LargeImageWrapper loading={loading}>
          <Flex fullHeight fullWidth align="center" justify="center">
            <Spinner
              bottomColor={colors.grey[100]}
              topColor={colors.grey[300]}
            />
          </Flex>
        </LargeImageWrapper>
      ) : (
        <LargeImageWrapper
          className="input--wrapper"
          error={!!error}
          align="center"
          justify="space-between"
          p={{ xs: 6 }}
          loaded={!!imageFile}
        >
          <input
            name={name}
            className="input"
            type="file"
            onChange={handleFileChange}
            accept={accepts ? accepts.join(',') : undefined}
            {...InputProps}
          />

          {imageFile && resolvePreview() === 'image' ? (
            <Flex align="center" gap={{ xs: 6, sm: 10 }}>
              <img
                className="preview"
                src={URL.createObjectURL(imageFile[0])}
                alt="preview"
              />
            </Flex>
          ) : imageFile && resolvePreview() === 'video' ? (
            <video
              className="preview"
              src={URL.createObjectURL(imageFile[0])}
              controls
            />
          ) : url ? (
            <Flex align="center" gap={{ xs: 6, sm: 10 }}>
              <div className="preview--wrapper">
                <img className="preview" src={url} alt="preview" />
              </div>
            </Flex>
          ) : (
            <Flex align="center" justify="center" fullHeight fullWidth>
              <Logo color={error ? 'red' : 'purple'} logoIcon />
            </Flex>
          )}

          <IconButton
            className="remove--button"
            icon="remove"
            size="sm"
            variant="light"
            color={colors.shades[100]}
            iconColor={colors.shades[100]}
            onClick={handleDelete}
            disabled={!imageFile}
          />
        </LargeImageWrapper>
      )}
      {error && <InputError error={error} name={name} />}
    </Flex>
  );
}

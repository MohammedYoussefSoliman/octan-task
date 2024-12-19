import React from 'react';

import loGet from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { v4 as uuidv4 } from 'uuid';

import { Flex } from '@/components/Grids';
import { useAppDispatch } from '@/hooks';
import { showError } from '@/state';

import type { FileType, MultipleFilesProps } from './types';

import InputError from '../InputError';
import Label from '../InputLabel';

import FileInput from './FileInput';

const newFile = (file?: File): FileType => {
  return {
    file: file || null,
    id: uuidv4(),
  };
};

export default function FilesInput({
  name,
  files: currentFiles = [],
  setValue,
  getValues,
  uploadAction,
  deleteAction,
  register,
  setError,
  label,
  required,
  clearErrors,
  errors,
  maxFiles,
}: MultipleFilesProps) {
  const dispatch = useAppDispatch();
  const [files, setFiles] = React.useState<FileType[]>([
    ...currentFiles,
    newFile(),
  ]);
  const error = loGet(errors, name);

  const addFile = React.useCallback((file: File) => {
    setFiles((prevState) => [...prevState, newFile(file)]);
  }, []);

  const removeFile = React.useCallback(
    (id: string) => {
      const currenFiles = [...files];
      setFiles(currenFiles.filter((item) => item.id !== id));
    },
    [files],
  );

  return (
    <Flex direction="column" fullWidth gap={{ xs: 8 }}>
      {label && (
        <Label label={label} required={required} withTruncation={false} />
      )}
      <input
        type="hidden"
        {...register(name, {
          validate: (value) => {
            if (!required) return true;
            if (isEmpty(value)) {
              return isEmpty(value) && typeof required === 'string'
                ? required
                : 'requiredField';
            }
            return true;
          },
        })}
      />
      <Flex gap={{ xs: 16 }}>
        {files.map((item, index) => (
          <FileInput
            key={item.id}
            name={`${name}[${index}]`}
            setValue={setValue}
            setError={setError}
            file={getValues(`${name}[${index}]`)}
            error={loGet(errors, `${name}[${index}]`)?.message as string}
            clearErrors={clearErrors}
            disabled={!!maxFiles && index + 1 > maxFiles}
            hideWhileDisabled
            uploadAction={async (file) => {
              let response = null;
              try {
                clearErrors(name);
                response = await uploadAction(file);
                addFile(file);
              } catch (err) {
                console.log({ err });
                removeFile(item.id);
              }
              return response;
            }}
            deleteAction={async (fileId) => {
              try {
                await deleteAction(fileId);
              } catch (errResponse) {
                if ((errResponse as any).response?.data) {
                  dispatch(
                    showError(
                      (errResponse as any).response?.data?.errors[0]?.message,
                    ),
                  );
                }
              } finally {
                removeFile(item.id);
                let storedFiles = getValues(name);
                storedFiles = storedFiles.filter((fi: any) => fi !== undefined);
                if (isEmpty(storedFiles)) {
                  storedFiles = undefined;
                } else {
                  storedFiles = storedFiles.filter(
                    (file: any) => file.id !== item.id,
                  );
                }
                setValue(name, storedFiles);
              }
            }}
          />
        ))}
      </Flex>
      {error && <InputError error={error.message as string} name={name} />}
    </Flex>
  );
}

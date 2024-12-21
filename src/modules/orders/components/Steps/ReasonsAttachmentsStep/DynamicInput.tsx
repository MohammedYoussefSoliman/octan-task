import React from 'react';

import { useTheme } from '@emotion/react';
import loGet from 'lodash/get';
import {
  Control,
  FieldErrorsImpl,
  FieldValues,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';

import { FileInput, FilesInput, TextArea, Flex, P3 } from '@/components';
import { formDataHandler } from '@/helpers/functions';
import { useAppDispatch, useAppSelector, useAxiosInstance } from '@/hooks';
import { showError } from '@/state';
import { ReturnReasonsRule } from '@/state/types';

type Props = {
  rule: ReturnReasonsRule;
  control: Control<FieldValues, any>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  register: UseFormRegister<any>;
  setError: UseFormSetError<any>;
  clearErrors: UseFormClearErrors<FieldValues>;
  id: string | number;
  index: number;
  errors?: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
  callback?: (name: string, value: any) => void;
};

const detectFileType = (fileType: string) => {
  if (fileType.includes('video')) {
    return 'video';
  }
  return 'image';
};

export default function DynamicInput({
  rule,
  control,
  setValue,
  getValues,
  register,
  setError,
  errors,
  id,
  index,
  clearErrors,
  callback,
}: Props) {
  let Input;

  const { pallet } = useTheme();
  const dispatch = useAppDispatch();
  const {
    consumerOrder: { order },
  } = useAppSelector((state) => state);
  const { post, delete: del } = useAxiosInstance();

  React.useEffect(() => {
    setValue(`items[${index}].id`, id);
  }, [id, index, setValue]);

  if (rule.type === 'image2') {
    Input = (
      <FileInput
        control={control}
        setValue={setValue}
        section="returnReason"
        name={`items[${index}].${rule.name}`}
        changeHandler={(value) => {
          if (callback) callback(`items[${id}].${rule.name}`, value);
        }}
        variant="large"
        required
      />
    );
  } else if (rule.type === 'image') {
    Input = (
      <FilesInput
        name={`items[${index}].files`}
        setValue={setValue}
        files={getValues(`items[${index}].files`)}
        getValues={getValues}
        label="attachMultipleFile"
        register={register}
        setError={setError}
        clearErrors={clearErrors}
        uploadAction={async (file) => {
          try {
            const response = await post(
              'upload-file',
              formDataHandler({
                file,
                section_name: 'returnReason',
                order_id: loGet(order, 'order_number', ''),
                store_id: loGet(order, 'store.id', ''),
                type: detectFileType(file.type),
              }),
            );
            return response;
          } catch (resPonseError) {
            if ((resPonseError as any).response?.data) {
              dispatch(
                showError(
                  (resPonseError as any).response?.data?.errors[0]?.message,
                ),
              );
            }
            return resPonseError;
          }
        }}
        deleteAction={async (fileId) => {
          try {
            await del(`delete-file/${fileId}`);
          } catch (resPonseError) {
            if ((resPonseError as any).response?.data) {
              dispatch(
                showError(
                  (resPonseError as any).response?.data?.errors[0]?.message,
                ),
              );
            }
          }
        }}
        required="noFileAttached"
        errors={errors}
      />
    );
  } else {
    Input = (
      <Flex
        width={{ xs: '100%', md: 'auto' }}
        direction="column"
        gap={{ xs: 6 }}
      >
        <P3 text="requiredTextPlaceholder" color={pallet.text.heading} />
        <TextArea
          name={`items[${index}].${rule.name}`}
          control={control}
          changeHandler={(e) => {
            if (callback) callback(`items[${id}].${rule.name}`, e.target.value);
          }}
          required
        />
      </Flex>
    );
  }

  return Input;
}

import { useCallback, useState } from 'react';

import { useTheme } from '@emotion/react';

import {
  H6,
  P3,
  Tooltip,
  Modal,
  FilesInput,
  Flex,
  Form,
  Button,
  IconButton,
} from '@/components';
import { formDataHandler } from '@/helpers/functions';
import { useAppDispatch, useAxiosInstance } from '@/hooks';
import { queryClient } from '@/Providers/AppSetup';
import { showError } from '@/state';

type ItemImages = {
  file: File;
  id: string;
  url?: string;
}[];

const detectFileType = (fileType: string) => {
  if (fileType.includes('video')) {
    return 'video';
  }
  return 'image';
};

const filesObj = (items: ItemImages[], name: string, itemIndex: number) => {
  let readyObj = {};

  items[itemIndex].forEach((item, fileIndex) => {
    readyObj = {
      ...readyObj,
      [`${name}[files][${fileIndex}]`]: item.id,
    };
  });
  return readyObj;
};

type AddMoreImagesFormProps = {
  name: string;
  itemId: string;
  itemIndex: number;
  storeId: string;
  orderNumber: string;
};

export default function AddMoreImagesForm({
  name,
  itemIndex,
  itemId,
  storeId,
  orderNumber,
}: AddMoreImagesFormProps) {
  const { pallet, shadows } = useTheme();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { post, delete: del } = useAxiosInstance();

  const onSubmit = useCallback(
    async (data: any) => {
      setSubmitting(true);
      try {
        const response = await post(
          'customer/add-images-order-items',
          formDataHandler({
            [`${name}[id]`]: itemId,
            ...filesObj(data.items, name, itemIndex),
          }),
        );

        if (response.status === 200) {
          queryClient.invalidateQueries({
            queryKey: ['order'],
          });
          setOpenModal(false);
          setSubmitting(false);
        }
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
    },
    [dispatch, itemId, itemIndex, name, post],
  );

  return (
    <Flex mt="auto">
      <Tooltip
        title={<P3 text="addMorePhotos" />}
        tooltipStyles={{
          background: pallet.primary[100],
          boxShadow: shadows[1],
          borderRadius: 10,
        }}
        placement="top"
      >
        <IconButton
          borderRadius="md"
          size="lg"
          icon="plus"
          variant="secondary"
          onClick={() => setOpenModal(true)}
        />
      </Tooltip>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Flex direction="column" gap="16px" fullWidth>
          <Flex justify="space-between" fullWidth>
            <H6 text="addMorePhotos" />
            <IconButton
              size="sm"
              icon="times"
              variant="secondary"
              onClick={() => setOpenModal(false)}
            />
          </Flex>
          <Form onSubmit={onSubmit}>
            {({
              register,
              setValue,
              getValues,
              clearErrors,
              setError,
              formState: { errors },
            }) => {
              return (
                <Flex direction="column" gap="16px" fullWidth>
                  <FilesInput
                    name={name}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                    setError={setError}
                    maxFiles={6}
                    errors={errors}
                    required
                    clearErrors={clearErrors}
                    uploadAction={async (file) => {
                      try {
                        const response = await post(
                          'upload-file',
                          formDataHandler({
                            file,
                            section_name: 'returnReason',
                            order_id: orderNumber,
                            store_id: storeId,
                            type: detectFileType(file.type),
                          }),
                        );
                        return response;
                      } catch (resPonseError) {
                        if ((resPonseError as any).response?.data) {
                          dispatch(
                            showError(
                              (resPonseError as any).response?.data?.errors[0]
                                ?.message,
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
                              (resPonseError as any).response?.data?.errors[0]
                                ?.message,
                            ),
                          );
                        }
                      }
                    }}
                  />
                  <Button
                    isLoading={submitting}
                    size="sm"
                    borderRadius="md"
                    type="submit"
                    fullWidth
                  >
                    saveAddedPhotos
                  </Button>
                </Flex>
              );
            }}
          </Form>
        </Flex>
      </Modal>
    </Flex>
  );
}

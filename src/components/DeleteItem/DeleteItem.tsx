import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { ConfirmationModal, IconButton } from '@/components';

type DeleteItemProps = {
  endpoint: string;
  id: string;
  successMessage?: string;
  queryKey: string[];
};

export function DeleteItem({
  endpoint,
  successMessage,
  queryKey,
  id,
}: DeleteItemProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState<boolean>(false);

  const { mutate } = useMutation({
    mutationFn: () => {
      return axios.delete(`http://localhost:8000/${endpoint}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
      if (successMessage) toast.success(successMessage);
    },
    onError: () => {
      toast.error('something went wrong');
    },
  });
  return (
    <>
      <IconButton
        iconName="X"
        variant="destructive"
        onClick={() => setOpen(true)}
      />
      <ConfirmationModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={mutate}
        title="Delete item"
        description="are you sure you want to delete this item"
      />
    </>
  );
}

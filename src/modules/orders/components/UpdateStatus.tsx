import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { SelectInput } from '@/components';
import { Order } from '@/types/common.types';
import { Status } from '@/types/enums';

type UpdateStatusProps = {
  order: Order;
};

export default function UpdateStatus({ order }: UpdateStatusProps) {
  const options = Object.keys(Status).map((stat) => ({
    label: stat,
    value: Status[stat as keyof typeof Status],
  }));

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (status: Status) => {
      return axios.put(
        `http://localhost:8000/orders/${order.id}`,
        JSON.stringify({ ...order, status }),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
      toast.success(`order: ${order.id} status updated successfully`);
    },
    onError: () => {
      toast.error('something went wrong');
    },
  });

  return (
    <SelectInput
      options={options}
      placeholder="select status"
      onValueChange={(value) => mutate(value as Status)}
    />
  );
}

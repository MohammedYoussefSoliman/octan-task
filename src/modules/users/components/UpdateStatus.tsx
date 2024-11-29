import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

import { SwitchInput, Typography } from '@/components';
import { User } from '@/types/common.types';
import { cn } from '@/utils';

type UpdateStatusProps = {
  user: User;
};

export default function UpdateStatus({ user }: UpdateStatusProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (active: boolean) => {
      return axios.put(
        `http://localhost:8000/users/${user.id}`,
        JSON.stringify({ ...user, active }),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
      toast.success(`user: ${user.id} status updated successfully`);
    },
    onError: () => {
      toast.error('something went wrong');
    },
  });

  return (
    <SwitchInput
      checked={user.active}
      label={
        <Typography
          className={cn('font-semibold text-slate-500', [
            user.active && 'text-indigo-500',
          ])}
          as="small"
        >
          {user.active ? 'active' : 'inactive'}
        </Typography>
      }
      onCheckedChange={mutate}
    />
  );
}

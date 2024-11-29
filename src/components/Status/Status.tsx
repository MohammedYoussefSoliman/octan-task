import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';

const statusVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium w-fit',
  {
    variants: {
      variant: {
        pending: 'bg-yellow-100 text-yellow-800',
        shipped: 'bg-blue-100 text-blue-800',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
      },
    },
  },
);

interface StatusProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusVariants> {
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
}

export function Status({ status, className, ...props }: StatusProps) {
  return (
    <span
      className={cn(statusVariants({ variant: status }), className)}
      {...props}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

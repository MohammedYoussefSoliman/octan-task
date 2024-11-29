import { ReactNode } from 'react';

import { Typography } from '@/components';

type InfoItemProps = {
  label: string;
  children: ReactNode;
};

export function InfoItem({ label, children }: InfoItemProps) {
  const content =
    typeof children === 'string' ? (
      <Typography as="p1">{children}</Typography>
    ) : (
      children
    );
  return (
    <div className="flex flex-col gap-1">
      <Typography as="small">{label}</Typography>
      {content}
    </div>
  );
}

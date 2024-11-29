import { useState } from 'react';

import { IconButton, DetailsModal } from '@/components';

export type ViewDetailsProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function ViewDetails({
  title,
  description,
  children,
}: ViewDetailsProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        iconName="Eye"
        variant="ghost"
      />
      <DetailsModal
        onClose={() => setOpen(false)}
        title={title}
        description={description}
        isOpen={open}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{children}</div>
      </DetailsModal>
    </>
  );
}

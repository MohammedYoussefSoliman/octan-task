import * as Dialog from '@radix-ui/react-dialog';

import { IconButton } from '@/components';

type UserDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function DetailsModal({
  isOpen,
  title,
  description,
  children,
  onClose,
}: UserDetailsModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed  left-[50%] top-[50%] z-50 w-full min-w-max max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <div className="w-full flex items-center justify-between gap-2">
            <Dialog.Title className="text-lg font-semibold leading-none tracking-tight">
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <IconButton iconName="X" size="sm" variant="ghost" />
            </Dialog.Close>
          </div>
          {description && (
            <Dialog.Description className="text-sm text-gray-500 mt-2">
              {description}
            </Dialog.Description>
          )}

          <div className="mt-4 space-y-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

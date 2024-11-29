import { Toaster as Sonner, ToasterProps } from 'sonner';

import { Icon } from '@/components';

export const Toaster = ({
  position = 'bottom-right',
  expand,
  ...props
}: ToasterProps) => {
  return (
    <Sonner
      position={position}
      expand={expand}
      richColors
      icons={{
        success: <Icon name="CircleCheck" className="w-4 h-4" />,
        error: <Icon name="CircleX" className="w-4 h-4" />,
        warning: <Icon name="CircleAlert" className="w-4 h-4" />,
        loading: <Icon name="LoaderCircle" className="w-4 h-4 animate-spin" />,
        info: <Icon name="Info" className="w-4 h-4" />,
      }}
      {...props}
      toastOptions={{
        classNames: {
          title: '!font-medium',
          info: '!bg-indigo-50 !text-indigo-500 !border-indigo-100',
          description: '!text-neutral-500',
          actionButton:
            '!bg-indigo-500 !text-indigo-50 hover:!bg-indigo-600/90 !transition-colors',
        },
      }}
    />
  );
};

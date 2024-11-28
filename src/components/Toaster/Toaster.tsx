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
          info: '!bg-primary-50 !text-primary-500 !border-primary-100',
          description: '!text-neutral-500',
          actionButton:
            '!bg-primary-500 !text-primary-50 hover:!bg-primary-600/90 !transition-colors',
        },
      }}
    />
  );
};

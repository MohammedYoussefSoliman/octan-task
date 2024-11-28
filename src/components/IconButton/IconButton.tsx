import colors from 'tailwindcss/colors';

import { Icon } from '@/components';

import type { IconButtonProps } from './IconButtons.types';

import useIconButtonConfig from './useIconButtonConfig';

export function IconButton({
  iconName,
  variant,
  fill,
  size,
  isLoading,
  disabled,
  iconFill,
  className,
  iconColor,
  iconClassName,
  ...props
}: IconButtonProps) {
  const { classes, iconColor: currentIconColor } = useIconButtonConfig({
    variant,
    fill,
    size,
    isLoading,
    disabled,
    className,
  });

  // TODO add spinner
  // TODO manage loading content (need loading Icon)

  return (
    <button
      className={classes}
      disabled={disabled}
      type={props.type || 'button'}
      {...props}
    >
      {isLoading ? (
        <div className="flex gap-2 items-center">
          <Icon
            name="LoaderCircle"
            color={colors.gray[400]}
            className="animate-spin"
          />
        </div>
      ) : (
        <Icon
          name={iconName}
          color={iconColor || currentIconColor}
          size={size === 'sm' ? 16 : 20}
          fill={iconFill}
          iconFill={iconFill}
          className={iconClassName}
        />
      )}
    </button>
  );
}

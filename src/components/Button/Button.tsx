import { Icon } from '@/components';

import type { ButtonProps } from './Buttons.types';

import useButtonConfig from './useButtonConfig';

export function Button({
  children,
  variant,
  fill,
  size,
  width,
  isLoading,
  disabled,
  suffixIcon,
  prefixIcon,
  iconFill,
  className,
  isFocused,
  ...props
}: ButtonProps) {
  const { classes, iconColor } = useButtonConfig({
    variant,
    fill,
    size,
    width,
    isLoading,
    disabled,
    isFocused,
    className,
  });

  const loadingContent = typeof isLoading === 'boolean' ? 'loading' : isLoading;

  return (
    <button
      className={classes}
      disabled={disabled || Boolean(isLoading) || isFocused}
      type={props.type || 'button'}
      {...props}
    >
      {prefixIcon && (
        <Icon
          name={prefixIcon}
          color={iconColor}
          size={size === 'sm' ? 16 : 20}
          fill={iconFill}
          iconFill={iconFill}
        />
      )}
      {isLoading ? (
        <div className="flex gap-2 items-center">{loadingContent}</div>
      ) : (
        children
      )}
      {suffixIcon && (
        <Icon
          name={suffixIcon}
          color={iconColor}
          size={size === 'sm' ? 16 : 20}
          fill={iconFill}
          iconFill={iconFill}
        />
      )}
    </button>
  );
}

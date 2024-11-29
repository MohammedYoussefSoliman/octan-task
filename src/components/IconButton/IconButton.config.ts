import colors from 'tailwindcss/colors';

const disabled = {
  outlined: [
    'text-neutral-500',
    'bg-neutral-200',
    'border',
    'border-neutral-400',
    'cursor-not-allowed',
  ],
  filled: ['text-neutral-500', 'bg-neutral-300/80', 'cursor-not-allowed'],
};

export const defaultClasses = [
  'flex',
  'items-center',
  'justify-center',
  'font-medium',
  'focus:outline-none',
  'focus:ring-2',
  'cursor-pointer',
  'rounded-xl',
  'gap-2',
  '!leading-none',
  'transition-colors',
];

export const variantsConfig = {
  primary: {
    fill: {
      outlined: [
        'text-indigo-400',
        'bg-white',
        'enabled:hover:bg-indigo-50',
        'border',
        'border-indigo-400',
        'active:bg-indigo-100',
        'focus:ring-indigo-300',
      ],
      filled: [
        'text-white',
        'bg-indigo-500',
        'enabled:hover:bg-indigo-500/90',
        'outline-indigo-400/[.55]',
        'active:bg-indigo-600',
        'focus:ring-indigo-300',
      ],
    },
    disabled,
  },
  success: {
    fill: {
      outlined: [
        'text-success-500',
        'bg-white',
        'enabled:hover:bg-success-50',
        'border',
        'border-success-500',
        'active:bg-success-100',
        'focus:ring-success-300',
      ],
      filled: [
        'text-white',
        'bg-success-500',
        'enabled:hover:bg-success-600/90',
        'active:bg-success-600',
        'focus:ring-success-300',
      ],
    },
    disabled,
  },
  warn: {
    fill: {
      outlined: [
        'text-warning-500',
        'bg-white',
        'enabled:hover:bg-warning-50',
        'border',
        'border-warning-400',
        'active:bg-warning-50',
        'focus:ring-warning-300',
      ],
      filled: [
        'text-white',
        'bg-warning-500',
        'enabled:hover:bg-warning-600',
        'active:bg-warning-600',
        'focus:ring-warning-300',
      ],
    },
    disabled,
  },
  destructive: {
    fill: {
      outlined: [
        'text-destructive-500',
        'bg-white',
        'enabled:hover:bg-destructive-50',
        'border',
        'border-destructive-500',
        'active:bg-destructive-100',
        'focus:ring-destructive-300',
      ],
      filled: [
        'text-white',
        'bg-destructive-500',
        'enabled:hover:bg-destructive-600/90',
        'active:bg-destructive-600',
        'focus:ring-destructive-300',
      ],
    },
    disabled,
  },
  light: {
    fill: {
      outlined: [
        'text-indigo-500',
        'bg-white',
        'enabled:hover:bg-indigo-50',
        'border',
        'border-indigo-400',
        'active:bg-indigo-100',
        'focus:ring-indigo-200',
      ],
      filled: [
        'text-indigo-500',
        'bg-indigo-100',
        'enabled:hover:bg-indigo-200/70',
        'active:bg-indigo-200',
        'focus:ring-indigo-200',
      ],
    },
    disabled,
  },
  ghost: {
    fill: {
      outlined: [
        'text-neutral-500',
        'bg-white',
        'enabled:hover:bg-neutral-50',
        'border',
        'border-transparent',
        'active:bg-neutral-100',
        'focus:ring-neutral-200',
      ],
      filled: [
        'text-neutral-500',
        'enabled:hover:bg-neutral-100',
        'active:bg-neutral-100',
        'focus:ring-neutral-100',
      ],
    },
    disabled,
  },
} as const;

export const sizeConfig = {
  sm: [
    'md:h-8',
    'md:w-8',
    'aspect-square',
    'md:rounded-md',
    'h-6',
    'w-6',
    'rounded-sm',
    'p-1',
  ],
  md: [
    'md:h-10',
    'md:w-10',

    'md:rounded-lg',
    'h-8',
    'w-8',
    'rounded-md',
    'p-1',
  ],
  lg: [
    'md:h-12',
    'md:w-12',
    'aspect-square',
    'md:rounded-xl',
    'h-10',
    'w-10',
    'rounded-lg',
    'p-1',
  ],
} as const;

export const iconColors = {
  primary: {
    fill: {
      outlined: colors.indigo[500],
      filled: colors.white,
    },
  },
  success: {
    fill: {
      outlined: colors.green[500],
      filled: colors.white,
    },
  },
  warn: {
    fill: {
      outlined: colors.amber[500],
      filled: colors.white,
    },
  },
  destructive: {
    fill: {
      outlined: colors.red[500],
      filled: colors.white,
    },
  },
  light: {
    fill: {
      outlined: colors.indigo[500],
      filled: colors.indigo[500],
    },
  },
  ghost: {
    fill: {
      outlined: colors.neutral[500],
      filled: colors.neutral[500],
    },
  },
  disabled: {
    fill: {
      outlined: colors.neutral[500],
      filled: colors.neutral[500],
    },
  },
};

import colors from 'tailwindcss/colors';

const disabled = {
  outlined: [
    'text-neutral-400',
    'bg-neutral-200',
    'border',
    'border-neutral-300',
    'cursor-not-allowed',
  ],
  filled: ['text-neutral-500', 'bg-neutral-300/80', 'cursor-not-allowed'],
};

export const focused = {
  primary: {
    outlined: ['bg-indigo-100', 'border-indigo-500', 'ring-indigo-300'],
    filled: ['bg-indigo-500', 'text-white', 'ring-indigo-300'],
  },
  success: {
    outlined: ['bg-green-100', 'border-green-500', 'ring-green-300'],
    filled: ['bg-green-600', 'ring-green-300'],
  },
  warn: {
    outlined: ['bg-amber-100', 'border-amber-500', 'ring-amber-300'],
    filled: ['bg-amber-600', 'ring-amber-300'],
  },
  destructive: {
    outlined: ['bg-red-100', 'border-red-500', 'ring-red-300'],
    filled: ['bg-red-600', 'ring-red-300'],
  },
  light: {
    outlined: ['bg-indigo-100', 'border-indigo-500', 'ring-indigo-300'],
    filled: ['text-white', 'bg-indigo-500', 'ring-indigo-200'],
  },
  neutral: {
    outlined: ['bg-neutral-100', 'border-neutral-500', 'ring-neutral-300'],
    filled: ['text-white', 'bg-neutral-500', 'ring-neutral-200'],
  },
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
  'whitespace-nowrap',
];

export const variantsConfig = {
  primary: {
    fill: {
      outlined: [
        'text-indigo-400',
        'bg-white',
        'enabled:hover:bg-indigo-50/50',
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
        'text-green-500',
        'bg-white',
        'enabled:hover:bg-green-50',
        'border',
        'border-green-500',
        'active:bg-green-100',
        'focus:ring-green-300',
      ],
      filled: [
        'text-white',
        'bg-green-500',
        'enabled:hover:bg-green-600/90',
        'active:bg-green-600',
        'focus:ring-green-300',
      ],
    },
    disabled,
  },
  warn: {
    fill: {
      outlined: [
        'text-amber-500',
        'bg-white',
        'enabled:hover:bg-amber-50',
        'border',
        'border-amber-400',
        'active:bg-amber-50',
        'focus:ring-amber-300',
      ],
      filled: [
        'text-white',
        'bg-amber-500',
        'enabled:hover:bg-amber-600',
        'active:bg-amber-600',
        'focus:ring-amber-300',
      ],
    },
    disabled,
  },
  destructive: {
    fill: {
      outlined: [
        'text-red-500',
        'bg-white',
        'enabled:hover:bg-red-50',
        'border',
        'border-red-500',
        'active:bg-red-100',
        'focus:ring-red-300',
      ],
      filled: [
        'text-white',
        'bg-red-500',
        'enabled:hover:bg-red-600/90',
        'active:bg-red-600',
        'focus:ring-red-300',
      ],
    },
    disabled,
  },
  light: {
    fill: {
      outlined: [
        'text-indigo-500',
        'bg-indigo-50',
        'enabled:hover:bg-indigo-100',
        'border',
        'border-indigo-300',
        'active:bg-indigo-100',
        'focus:ring-indigo-200',
      ],
      filled: [
        'text-indigo-500',
        'bg-indigo-100/70',
        'enabled:hover:bg-indigo-200/70',
        'active:bg-indigo-200',
        'focus:ring-indigo-200',
      ],
    },
    disabled,
  },
  neutral: {
    fill: {
      outlined: [
        'text-neutral-500',
        'bg-neutral-50',
        'enabled:hover:bg-neutral-100',
        'border',
        'border-border',
        'active:bg-neutral-100',
        'focus:ring-neutral-200',
      ],
      filled: [
        'text-white',
        'bg-neutral-500',
        'enabled:hover:bg-neutral-600/90',
        'active:bg-neutral-600',
        'focus:ring-neutral-300',
      ],
    },
    disabled,
  },
} as const;

export const widthConfig = {
  full: 'w-full',
  min: 'w-min',
  max: 'w-max',
  fit: 'w-fit',
  initial: 'min-w-32',
} as const;

export const sizeConfig = {
  sm: [
    'py-1',
    'px-2',
    'h-8',
    'rounded-md',
    'text-xs',
    'md:rounded-lg',
    'md:px-3',
    'md:py-2',
  ],
  md: [
    'py-1',
    'px-2',
    'h-8',
    'rounded-md',
    'text-sm',
    'md:rounded-lg',
    'md:px-3',
    'md:py-2',
    'md:h-10',
  ],
  lg: [
    'py-2.5',
    'px-4',
    'h-12',
    'rounded-lg',
    'text-base',
    'md:px-5',
    'md:py-4',
    'gap-3',
    'border-2',
  ],
} as const;

export const iconColors = {
  primary: {
    fill: {
      outlined: colors.indigo[600][500],
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
      outlined: colors.amber[600],
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
      outlined: colors.indigo[600][500],
      filled: colors.indigo[600][500],
    },
  },
  disabled: {
    fill: {
      outlined: colors.neutral[400],
      filled: colors.neutral[400],
    },
  },
  neutral: {
    fill: {
      outlined: colors.neutral[500],
      filled: colors.neutral[500],
    },
  },
};

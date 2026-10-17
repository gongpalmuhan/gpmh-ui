export const gpmhTokens = {
  color: {
    neutral: {
      0: '#ffffff',
      50: '#f8f8f8',
      100: '#f0f0f0',
      200: '#dedede',
      300: '#c4c4c4',
      400: '#969696',
      500: '#6b6b6b',
      600: '#4c4c4c',
      700: '#303030',
      800: '#1f1f1f',
      900: '#111111'
    },
    status: {
      danger: '#c9362b',
      warning: '#996000',
      success: '#287552',
      info: '#216da6'
    }
  },
  space: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px'
  },
  radius: {
    none: '0px',
    sm: '6px',
    md: '10px',
    lg: '16px',
    pill: '999px'
  }
} as const;

export type GpmhTokens = typeof gpmhTokens;

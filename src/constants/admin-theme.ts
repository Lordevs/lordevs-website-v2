/**
 * Admin theme configuration
 * Centralized styling and theme definitions for consistent admin UI
 */

// Color palette for admin interface
export const ADMIN_COLORS = {
  primary: {
    blue: {
      50: '#eff6ff',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
    },
    purple: {
      400: '#a855f7',
      500: '#9333ea',
      600: '#7c3aed',
    },
  },
  status: {
    success: {
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
    },
    warning: {
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
    },
    error: {
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
    },
    info: {
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
    },
  },
  gray: {
    100: '#f3f4f6',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    800: '#1f2937',
    900: '#111827',
  },
} as const;

// Gradient definitions
export const ADMIN_GRADIENTS = {
  primary: 'from-[#00B2FF] to-[#8F00FF]',
  primaryHover: 'from-[#0094D9] to-[#7300D9]',
  background: 'from-[#23243A] to-[#181A20]',
  card: 'from-[#23243A]/50 to-[#181A20]/50',
  border: 'from-blue-600/20 to-purple-600/20',
  glow: 'from-blue-600/10 to-purple-600/10',
} as const;

// Common component styles
export const ADMIN_STYLES = {
  card: {
    base: 'group relative backdrop-blur-sm transition-all duration-300',
    hover: 'hover:shadow-lg hover:scale-105',
    gradient: 'bg-gradient-to-br',
    glow: 'shadow-lg',
  },
  button: {
    primary: `
      group relative bg-gradient-to-r ${ADMIN_GRADIENTS.primary} 
      shadow-lg shadow-blue-500/25 transition-all duration-300 
      hover:scale-105 hover:from-[#0094D9] hover:to-[#7300D9] 
      hover:shadow-blue-500/40
    `,
    secondary: `
      group relative border border-blue-500/30 bg-gradient-to-r 
      from-[#23243A]/50 to-[#181A20]/50 backdrop-blur-sm 
      transition-all duration-300 hover:border-blue-500/50
    `,
  },
  input: {
    base: `
      rounded-lg border border-blue-500/30 bg-gradient-to-r 
      from-[#23243A]/50 to-[#181A20]/50 px-3 py-2 text-white 
      backdrop-blur-sm focus:border-blue-500/50 focus:ring-2 
      focus:ring-blue-500/20 focus:outline-none
    `,
  },
  text: {
    primary: 'text-white',
    secondary: 'text-gray-300',
    muted: 'text-gray-400',
    accent: 'text-blue-400',
  },
} as const;

// Animation configurations
export const ADMIN_ANIMATIONS = {
  durations: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easings: {
    easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// Layout configurations
export const ADMIN_LAYOUT = {
  sidebar: {
    width: '256px',
    collapsedWidth: '64px',
  },
  header: {
    height: '64px',
  },
  content: {
    padding: '24px',
    maxWidth: '1200px',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const;

// Icon sizes
export const ADMIN_ICON_SIZES = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
  xxl: 'h-12 w-12',
} as const;

// Spacing scale
export const ADMIN_SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
} as const;

import { type HTMLAttributes, type ReactNode } from 'react';

export type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
};

export function Badge({ children, className, variant = 'neutral', ...props }: BadgeProps) {
  return (
    <span {...props} className={['gpmh-badge', className].filter(Boolean).join(' ')} data-variant={variant}>
      {children}
    </span>
  );
}

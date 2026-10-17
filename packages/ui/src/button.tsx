import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingLabel?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    disabled,
    isLoading = false,
    loadingLabel,
    size = 'md',
    type = 'button',
    variant = 'primary',
    ...props
  },
  ref
) {
  return (
    <button
      {...props}
      ref={ref}
      type={type}
      className={['gpmh-button', className].filter(Boolean).join(' ')}
      data-size={size}
      data-variant={variant}
      aria-busy={isLoading || undefined}
      disabled={disabled || isLoading}
    >
      {isLoading ? <span className="gpmh-button__spinner" aria-hidden="true" /> : null}
      <span>{isLoading && loadingLabel ? loadingLabel : children}</span>
    </button>
  );
});

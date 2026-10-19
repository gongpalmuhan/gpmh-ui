import { forwardRef, type SelectHTMLAttributes } from 'react';
import { FieldFrame, type FieldProps, useFieldIds } from './field';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & FieldProps;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    'aria-describedby': ariaDescribedBy,
    children,
    className,
    description,
    error,
    hideLabel,
    id: suppliedId,
    label,
    ...props
  },
  ref
) {
  const { describedBy, id } = useFieldIds({ ariaDescribedBy, description, error, id: suppliedId });

  return (
    <FieldFrame description={description} error={error} hideLabel={hideLabel} id={id} label={label}>
      <span className="gpmh-select-wrap">
        <select
          {...props}
          ref={ref}
          id={id}
          className={['gpmh-select', className].filter(Boolean).join(' ')}
          aria-describedby={describedBy}
          aria-invalid={Boolean(error) || undefined}
        >
          {children}
        </select>
        <span className="gpmh-select__icon" aria-hidden="true">⌄</span>
      </span>
    </FieldFrame>
  );
});

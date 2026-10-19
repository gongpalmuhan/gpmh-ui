import { forwardRef, type InputHTMLAttributes } from 'react';
import { FieldFrame, type FieldProps, useFieldIds } from './field';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & FieldProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    'aria-describedby': ariaDescribedBy,
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
      <input
        {...props}
        ref={ref}
        id={id}
        className={['gpmh-input', className].filter(Boolean).join(' ')}
        aria-describedby={describedBy}
        aria-invalid={Boolean(error) || undefined}
      />
    </FieldFrame>
  );
});

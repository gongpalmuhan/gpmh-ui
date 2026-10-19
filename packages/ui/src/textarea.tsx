import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { FieldFrame, type FieldProps, useFieldIds } from './field';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & FieldProps;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
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
      <textarea
        {...props}
        ref={ref}
        id={id}
        className={['gpmh-textarea', className].filter(Boolean).join(' ')}
        aria-describedby={describedBy}
        aria-invalid={Boolean(error) || undefined}
      />
    </FieldFrame>
  );
});

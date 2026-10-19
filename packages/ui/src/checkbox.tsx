import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'type'> & {
  children: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { children, className, description, error, id, ...props },
  ref
) {
  const generatedId = useId();
  const controlId = id ?? `gpmh-checkbox-${generatedId}`;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const ariaDescribedBy = [props['aria-describedby'], descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="gpmh-check-field" data-invalid={Boolean(error) || undefined}>
      <label className={['gpmh-check', className].filter(Boolean).join(' ')}>
        <input {...props} ref={ref} id={controlId} type="checkbox" aria-describedby={ariaDescribedBy} aria-invalid={Boolean(error) || undefined} />
        <span className="gpmh-check__box" aria-hidden="true" />
        <span className="gpmh-check__content">
          <span className="gpmh-check__label">{children}</span>
          {description ? <span className="gpmh-check__description" id={descriptionId}>{description}</span> : null}
        </span>
      </label>
      {error ? <p className="gpmh-field__error" id={errorId} role="alert">{error}</p> : null}
    </div>
  );
});

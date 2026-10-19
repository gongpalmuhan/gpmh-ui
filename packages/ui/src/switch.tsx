import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'type'> & {
  children: ReactNode;
  description?: ReactNode;
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { children, className, description, id, ...props },
  ref
) {
  const generatedId = useId();
  const controlId = id ?? `gpmh-switch-${generatedId}`;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const ariaDescribedBy = [props['aria-describedby'], descriptionId].filter(Boolean).join(' ') || undefined;

  return (
    <label className={['gpmh-switch', className].filter(Boolean).join(' ')}>
      <input {...props} ref={ref} id={controlId} type="checkbox" role="switch" aria-describedby={ariaDescribedBy} />
      <span className="gpmh-switch__track" aria-hidden="true"><span /></span>
      <span className="gpmh-switch__content">
        <span className="gpmh-switch__label">{children}</span>
        {description ? <span className="gpmh-switch__description" id={descriptionId}>{description}</span> : null}
      </span>
    </label>
  );
});

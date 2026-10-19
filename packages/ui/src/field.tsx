import { type ReactNode, useId } from 'react';

export type FieldProps = {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  hideLabel?: boolean;
};

type FieldFrameProps = FieldProps & {
  children: ReactNode;
  id: string;
};

export function useFieldIds({
  id: suppliedId,
  description,
  error,
  ariaDescribedBy
}: {
  id?: string;
  description?: ReactNode;
  error?: ReactNode;
  ariaDescribedBy?: string;
}) {
  const generatedId = useId();
  const id = suppliedId ?? `gpmh-field-${generatedId}`;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  return { describedBy, descriptionId, errorId, id };
}

export function FieldFrame({
  children,
  description,
  error,
  hideLabel = false,
  id,
  label
}: FieldFrameProps) {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="gpmh-field" data-invalid={Boolean(error) || undefined}>
      {label ? (
        <label className={hideLabel ? 'gpmh-field__label gpmh-visually-hidden' : 'gpmh-field__label'} htmlFor={id}>
          {label}
        </label>
      ) : null}
      {children}
      {description ? <p className="gpmh-field__description" id={descriptionId}>{description}</p> : null}
      {error ? <p className="gpmh-field__error" id={errorId} role="alert">{error}</p> : null}
    </div>
  );
}

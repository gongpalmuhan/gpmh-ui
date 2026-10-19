import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export type DialogSize = 'sm' | 'md' | 'lg';

export type DialogProps = {
  children: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  isDismissable?: boolean;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  size?: DialogSize;
  title: ReactNode;
};

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

export function Dialog({
  children,
  description,
  footer,
  isDismissable = true,
  isOpen,
  onOpenChange,
  size = 'md',
  title
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const generatedId = useId();
  const titleId = `gpmh-dialog-${generatedId}-title`;
  const descriptionId = description ? `gpmh-dialog-${generatedId}-description` : undefined;

  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return;

    previouslyFocusedElement.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const firstFocusableElement = dialogRef.current?.querySelector<HTMLElement>(focusableSelector);
    (firstFocusableElement ?? dialogRef.current)?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocusedElement.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen || typeof document === 'undefined') return null;

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape' && isDismissable) {
      event.stopPropagation();
      onOpenChange(false);
      return;
    }

    if (event.key !== 'Tab') return;

    const focusableElements = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
    if (!focusableElements.length) {
      event.preventDefault();
      dialogRef.current?.focus();
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return createPortal(
    <div
      className="gpmh-dialog-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (isDismissable && event.target === event.currentTarget) onOpenChange(false);
      }}
    >
      <div
        ref={dialogRef}
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        aria-modal="true"
        className="gpmh-dialog"
        data-size={size}
        role="dialog"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <header className="gpmh-dialog__header">
          <div>
            <h2 id={titleId}>{title}</h2>
            {description ? <p id={descriptionId}>{description}</p> : null}
          </div>
          {isDismissable ? (
            <button className="gpmh-dialog__close" type="button" onClick={() => onOpenChange(false)} aria-label="닫기">×</button>
          ) : null}
        </header>
        <div className="gpmh-dialog__body">{children}</div>
        {footer ? <footer className="gpmh-dialog__footer">{footer}</footer> : null}
      </div>
    </div>,
    document.body
  );
}

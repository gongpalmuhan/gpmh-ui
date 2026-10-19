import { cloneElement, useId, type ReactElement, type ReactNode } from 'react';

export type TooltipProps = {
  children: ReactElement;
  content: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
};

export function Tooltip({ children, content, side = 'top' }: TooltipProps) {
  const generatedId = useId();
  const tooltipId = `gpmh-tooltip-${generatedId}`;
  const trigger = children as ReactElement<{ 'aria-describedby'?: string }>;
  const describedBy = [trigger.props['aria-describedby'], tooltipId].filter(Boolean).join(' ');

  return (
    <span className="gpmh-tooltip" data-side={side}>
      {cloneElement(trigger, { 'aria-describedby': describedBy })}
      <span className="gpmh-tooltip__content" id={tooltipId} role="tooltip">{content}</span>
    </span>
  );
}

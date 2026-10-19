import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card({ className, ...props }, ref) {
  return <div {...props} ref={ref} className={['gpmh-card', className].filter(Boolean).join(' ')} />;
});

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader({ className, ...props }, ref) {
  return <div {...props} ref={ref} className={['gpmh-card__header', className].filter(Boolean).join(' ')} />;
});

export type CardTitleProps = HTMLAttributes<HTMLHeadingElement> & { children: ReactNode };

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle({ className, ...props }, ref) {
  return <h3 {...props} ref={ref} className={['gpmh-card__title', className].filter(Boolean).join(' ')} />;
});

export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement> & { children: ReactNode };

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(function CardDescription({ className, ...props }, ref) {
  return <p {...props} ref={ref} className={['gpmh-card__description', className].filter(Boolean).join(' ')} />;
});

export type CardContentProps = HTMLAttributes<HTMLDivElement>;

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(function CardContent({ className, ...props }, ref) {
  return <div {...props} ref={ref} className={['gpmh-card__content', className].filter(Boolean).join(' ')} />;
});

export type CardFooterProps = HTMLAttributes<HTMLDivElement>;

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter({ className, ...props }, ref) {
  return <div {...props} ref={ref} className={['gpmh-card__footer', className].filter(Boolean).join(' ')} />;
});

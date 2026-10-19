import { forwardRef, type HTMLAttributes, type TableHTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';

export type TableProps = TableHTMLAttributes<HTMLTableElement>;

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table({ className, ...props }, ref) {
  return <div className="gpmh-table-wrap"><table {...props} ref={ref} className={['gpmh-table', className].filter(Boolean).join(' ')} /></div>;
});

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(function TableHeader({ className, ...props }, ref) {
  return <thead {...props} ref={ref} className={['gpmh-table__header', className].filter(Boolean).join(' ')} />;
});

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(function TableBody({ className, ...props }, ref) {
  return <tbody {...props} ref={ref} className={['gpmh-table__body', className].filter(Boolean).join(' ')} />;
});

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(function TableRow({ className, ...props }, ref) {
  return <tr {...props} ref={ref} className={['gpmh-table__row', className].filter(Boolean).join(' ')} />;
});

export const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(function TableHead({ className, scope = 'col', ...props }, ref) {
  return <th {...props} ref={ref} className={['gpmh-table__head', className].filter(Boolean).join(' ')} scope={scope} />;
});

export const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(function TableCell({ className, ...props }, ref) {
  return <td {...props} ref={ref} className={['gpmh-table__cell', className].filter(Boolean).join(' ')} />;
});

export const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(function TableCaption({ className, ...props }, ref) {
  return <caption {...props} ref={ref} className={['gpmh-table__caption', className].filter(Boolean).join(' ')} />;
});

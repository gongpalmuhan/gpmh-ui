import { type HTMLAttributes } from 'react';

type PageItem = number | 'ellipsis-start' | 'ellipsis-end';

export type PaginationProps = Omit<HTMLAttributes<HTMLElement>, 'onChange'> & {
  nextLabel?: string;
  onPageChange: (page: number) => void;
  page: number;
  previousLabel?: string;
  siblingCount?: number;
  totalPages: number;
};

function getPageItems(page: number, totalPages: number, siblingCount: number): PageItem[] {
  const visibleCount = siblingCount * 2 + 5;
  if (totalPages <= visibleCount) return Array.from({ length: totalPages }, (_, index) => index + 1);

  const left = Math.max(2, page - siblingCount);
  const right = Math.min(totalPages - 1, page + siblingCount);
  const pages: PageItem[] = [1];

  if (left > 2) pages.push('ellipsis-start');
  for (let current = left; current <= right; current += 1) pages.push(current);
  if (right < totalPages - 1) pages.push('ellipsis-end');
  pages.push(totalPages);
  return pages;
}

export function Pagination({
  className,
  nextLabel = '다음',
  onPageChange,
  page,
  previousLabel = '이전',
  siblingCount = 1,
  totalPages,
  ...props
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const currentPage = Math.min(Math.max(1, page), totalPages);
  const items = getPageItems(currentPage, totalPages, Math.max(0, siblingCount));

  return (
    <nav {...props} className={['gpmh-pagination', className].filter(Boolean).join(' ')} aria-label="페이지 탐색">
      <button type="button" className="gpmh-pagination__button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>{previousLabel}</button>
      <ol className="gpmh-pagination__list">
        {items.map((item) => (
          <li key={item}>
            {typeof item === 'number' ? (
              <button
                type="button"
                className="gpmh-pagination__button"
                data-current={item === currentPage || undefined}
                aria-current={item === currentPage ? 'page' : undefined}
                aria-label={`${item}페이지`}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            ) : <span className="gpmh-pagination__ellipsis" aria-hidden="true">…</span>}
          </li>
        ))}
      </ol>
      <button type="button" className="gpmh-pagination__button" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>{nextLabel}</button>
    </nav>
  );
}

import { Button, Typography, IconButton } from '@/components';
import { usePagination } from '@/hooks';
import { cn } from '@/utils';

import { PaginationProps } from './Pagination.types';

export function Pagination({
  pagesLength,
  handleNext,
  dotClick,
  handlePrev,
  activePage = 1,
  className,
}: PaginationProps) {
  const paging = usePagination({
    totalPageCount: pagesLength,
    currentPage: activePage,
    siblingCount: 1,
  });

  if (pagesLength <= 1) return null;

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <IconButton
        disabled={activePage === 1}
        iconName="ChevronsLeft"
        onClick={() => handlePrev()}
      />
      <div className="flex items-center gap-2">
        {paging.map((num) => {
          const isActive = num === activePage;

          if (num === '...') {
            return (
              <div className="flex justify-center items-center w-8">
                <Typography as="p1" className="text-neutral-500">
                  {num}
                </Typography>
              </div>
            );
          }

          return (
            <Button
              key={`pagination-dot-${num}`}
              variant={isActive ? 'light' : 'neutral'}
              fill="outlined"
              className={cn('aspect-square md:text-lg')}
              onClick={() => {
                dotClick(num);
              }}
            >
              {num}
            </Button>
          );
        })}
      </div>
      <IconButton
        iconName="ChevronsRight"
        disabled={activePage === pagesLength}
        onClick={() => handleNext()}
      />
    </div>
  );
}

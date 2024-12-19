import { P1, P3, IconButton, Flex } from '@/components';
import { usePagination, useAppSelector } from '@/hooks';

import { DotButton, Wrapper } from './styles';

type Props = {
  pagesLength: number;
  activePage: number;
  handleNext: () => void;
  dotClick: (value: number) => void;
  handlePrev: () => void;
};

export default function PaginationController({
  pagesLength,
  handleNext,
  dotClick,
  handlePrev,
  activePage = 1,
}: Props) {
  const { language } = useAppSelector((state) => state.ui);
  const paging = usePagination({
    totalPageCount: pagesLength,
    currentPage: activePage,
    siblingCount: 1,
  });
  if (pagesLength <= 1) return null;

  return (
    <Wrapper align="center" gap="12px">
      <IconButton
        className="navigation--button"
        disabled={activePage === 1}
        icon={`chevron-${language === 'ar' ? 'right' : 'left'}`}
        onClick={() => handlePrev()}
        size="sm"
        variant="secondary"
      />
      <Flex align="center" gap={{ xs: 5, md: 10 }}>
        {paging.map((num) => {
          if (num === '...') {
            return <P1 text={num} color="inherit" />;
          }
          return (
            <DotButton
              key={`pagination-dot-${num}`}
              active={num === activePage}
              onClick={() => {
                dotClick(num);
              }}
            >
              <P3 text={num} color="inherit" />
            </DotButton>
          );
        })}
      </Flex>
      <IconButton
        className="navigation--button"
        disabled={activePage === pagesLength}
        onClick={() => handleNext()}
        icon={`chevron-${language === 'ar' ? 'left' : 'right'}`}
        size="sm"
        variant="secondary"
      />
    </Wrapper>
  );
}

export type PaginationProps = {
  pagesLength: number;
  activePage: number;
  handleNext: () => void;
  dotClick: (value: number) => void;
  handlePrev: () => void;
  className?: string;
};

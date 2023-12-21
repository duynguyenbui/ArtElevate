import React, { useState } from 'react';
import { Button } from './ui/button';

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  pageCount,
  onPageChange,
}: PaginationProps) => {
  const [pageNumber, setPageNumber] = useState(0);

  const handlePrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setPageNumber(newPage);
      onPageChange(newPage);
    }
  };

  const handleNext = () => {
    if (currentPage < pageCount) {
      const newPage = currentPage + 1;
      setPageNumber(newPage);
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex items-center justify-end space-x-2 py-4 mt-1">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleNext}
        disabled={currentPage === pageCount}
      >
        Next
      </Button>
    </div>
  );
};

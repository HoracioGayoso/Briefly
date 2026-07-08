"use client";

import { CPagination, CPaginationItem } from "@coreui/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const showEllipsis = currentPage + 2 < totalPages;
  const showLast = totalPages > 1 && currentPage !== totalPages;

  return (
    <CPagination align="center" aria-label="Paginación">
      <CPaginationItem disabled={currentPage === 1} onClick={() => onPageChange(1)}>
        «
      </CPaginationItem>
      <CPaginationItem disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        ‹
      </CPaginationItem>

      <CPaginationItem active>{currentPage}</CPaginationItem>

      {currentPage < totalPages && (
        <CPaginationItem onClick={() => onPageChange(currentPage + 1)}>{currentPage + 1}</CPaginationItem>
      )}
      {showEllipsis && <CPaginationItem disabled>…</CPaginationItem>}
      {showLast && <CPaginationItem onClick={() => onPageChange(totalPages)}>{totalPages}</CPaginationItem>}

      <CPaginationItem disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        ›
      </CPaginationItem>
      <CPaginationItem disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)}>
        »
      </CPaginationItem>
    </CPagination>
  );
}

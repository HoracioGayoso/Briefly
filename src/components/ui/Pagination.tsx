"use client";

import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/** Migrada de <CPagination> de CoreUI a botones Tailwind. */
function PageButton({
  children,
  active,
  disabled,
  onClick,
  ariaLabel,
  arrow,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  arrow?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-white/10 px-2 text-sm leading-none transition-colors",
        "text-(--color-text-secondary) hover:border-white/20 hover:bg-(--color-bg-elevated-2) hover:text-(--color-text-primary)",
        "disabled:pointer-events-none disabled:opacity-40 cursor-pointer",
        arrow && "text-lg",
        active &&
          "border-transparent bg-(--color-accent) text-white hover:bg-(--color-accent) hover:text-white pointer-events-none"
      )}
    >
      {children}
    </button>
  );
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const showEllipsis = currentPage + 2 < totalPages;
  const showLast = totalPages > 1 && currentPage !== totalPages;
  const atStart = currentPage === 1;
  const atEnd = currentPage === totalPages;

  return (
    <nav aria-label="Paginación" className="flex items-center gap-1">
      <PageButton arrow ariaLabel="Primera página" disabled={atStart} onClick={() => onPageChange(1)}>
        «
      </PageButton>
      <PageButton arrow ariaLabel="Página anterior" disabled={atStart} onClick={() => onPageChange(currentPage - 1)}>
        ‹
      </PageButton>

      <PageButton active>{currentPage}</PageButton>

      {currentPage < totalPages && (
        <PageButton onClick={() => onPageChange(currentPage + 1)}>{currentPage + 1}</PageButton>
      )}
      {showEllipsis && (
        <span className="px-1 text-(--color-text-tertiary) select-none">…</span>
      )}
      {showLast && <PageButton onClick={() => onPageChange(totalPages)}>{totalPages}</PageButton>}

      <PageButton arrow ariaLabel="Página siguiente" disabled={atEnd} onClick={() => onPageChange(currentPage + 1)}>
        ›
      </PageButton>
      <PageButton arrow ariaLabel="Última página" disabled={atEnd} onClick={() => onPageChange(totalPages)}>
        »
      </PageButton>
    </nav>
  );
}

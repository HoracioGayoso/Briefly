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

/**
 * Números de página a mostrar: siempre primera, última, la actual y sus
 * vecinas inmediatas, con "…" sólo donde hay un hueco real entre ellas. Un
 * Set dedupea los casos borde (ej. currentPage+1 === totalPages, donde antes
 * el botón "siguiente número" y el de "última página" repetían el mismo
 * valor — ver bug reportado con currentPage=2, totalPages=3 → "2 3 3").
 */
function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  const candidates = new Set([1, total, current - 1, current, current + 1]);
  const pages = [...candidates].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  let prev: number | null = null;
  for (const p of pages) {
    if (prev !== null && p - prev > 1) result.push("ellipsis");
    result.push(p);
    prev = p;
  }
  return result;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const atStart = currentPage === 1;
  const atEnd = currentPage === totalPages;
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav aria-label="Paginación" className="flex items-center gap-1">
      <PageButton arrow ariaLabel="Primera página" disabled={atStart} onClick={() => onPageChange(1)}>
        «
      </PageButton>
      <PageButton arrow ariaLabel="Página anterior" disabled={atStart} onClick={() => onPageChange(currentPage - 1)}>
        ‹
      </PageButton>

      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className="px-1 text-(--color-text-tertiary) select-none">
            …
          </span>
        ) : (
          <PageButton key={p} active={p === currentPage} onClick={() => onPageChange(p)}>
            {p}
          </PageButton>
        )
      )}

      <PageButton arrow ariaLabel="Página siguiente" disabled={atEnd} onClick={() => onPageChange(currentPage + 1)}>
        ›
      </PageButton>
      <PageButton arrow ariaLabel="Última página" disabled={atEnd} onClick={() => onPageChange(totalPages)}>
        »
      </PageButton>
    </nav>
  );
}

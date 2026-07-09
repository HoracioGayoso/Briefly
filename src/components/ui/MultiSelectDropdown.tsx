"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface MultiSelectDropdownProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  width?: number;
}

/**
 * Dropdown de selección múltiple con checkboxes (Fuero / Proceso / Estado en
 * el filtro de expedientes). Migrado de CoreUI a shadcn/Radix: el menú se
 * mantiene abierto al tildar (onSelect preventDefault) para elegir varios.
 */
export function MultiSelectDropdown({
  label,
  options,
  selected,
  onChange,
  width = 220,
}: MultiSelectDropdownProps) {
  const toggleOption = (option: string) => {
    onChange(
      selected.includes(option) ? selected.filter((o) => o !== option) : [...selected, option],
    );
  };

  const toggleText = selected.length > 0 ? selected.join(" | ") : "Seleccionar";

  return (
    <div className="flex items-center gap-2 min-w-0">
      <span className="text-sm whitespace-nowrap">{label}:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            aria-label={label}
            className="justify-between font-normal"
            style={{ width }}
          >
            <span className="truncate-cell">{toggleText}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0 opacity-60">
              <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" style={{ width }}>
          {options.map((option) => (
            <DropdownMenuCheckboxItem
              key={option}
              checked={selected.includes(option)}
              onCheckedChange={() => toggleOption(option)}
              onSelect={(e) => e.preventDefault()}
            >
              {option}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

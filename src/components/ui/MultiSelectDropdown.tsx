"use client";

import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CFormCheck } from "@coreui/react";

interface MultiSelectDropdownProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  width?: number;
}

/**
 * Dropdown de selección múltiple con checkboxes (Fuero / Proceso / Estado en
 * el filtro de expedientes). Antes eran 3 bloques de JSX casi idénticos
 * copiados y pegados; se unifican acá para no repetir el mismo markup.
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
      <CDropdown autoClose={false} style={{ width }}>
        <CDropdownToggle
          color="secondary"
          variant="outline"
          className="w-100 text-start d-flex align-items-center justify-content-between"
        >
          <span className="truncate-cell">{toggleText}</span>
        </CDropdownToggle>
        <CDropdownMenu>
          {options.map((option) => (
            <CDropdownItem key={option} as="label" className="d-flex align-items-center gap-2">
              <CFormCheck
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="m-0"
              />
              {option}
            </CDropdownItem>
          ))}
        </CDropdownMenu>
      </CDropdown>
    </div>
  );
}

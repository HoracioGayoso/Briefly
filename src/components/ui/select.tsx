"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Select con el patrón de shadcn/ui (sobre Radix), en vez del <select> nativo
 * anterior: el <select> nativo delega el popup de opciones al SO, por lo que
 * no seguía el tema oscuro del sitio (desentonaba con los DropdownMenu propios
 * de Expedientes). Este usa el mismo popup que DropdownMenu — reutiliza las
 * clases .briefly-menu / .briefly-menu-item de globals.css (mismo mecanismo de
 * highlight vía [data-highlighted], que Radix Select expone igual que
 * DropdownMenu) — así ambos se ven idénticos.
 *
 * Radix Select participa en submits de form nativos vía el prop `name` en
 * <Select> (Root): renderiza un <select> oculto por debajo, así que
 * FormData(form) sigue funcionando igual que con el <select> nativo anterior.
 */

const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between rounded-md border border-white/15 bg-(--color-bg-elevated-2) pl-3 pr-2 text-sm text-(--color-text-primary)",
      "outline-none transition-colors cursor-pointer",
      "focus-visible:border-(--color-accent) focus-visible:ring-2 focus-visible:ring-(--color-accent)/40",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[placeholder]:text-(--color-text-tertiary)",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 shrink-0 text-(--color-text-tertiary)" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      sideOffset={4}
      className={cn(
        "briefly-menu z-50 max-h-72 min-w-[8rem] overflow-hidden rounded-md border border-white/10 bg-(--color-bg-elevated) p-1 text-(--color-text-primary) shadow-(--shadow-md)",
        position === "popper" && "w-(--radix-select-trigger-width)",
        className
      )}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-0.5">{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "briefly-menu-item relative flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none transition-colors",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator>
      <Check className="h-4 w-4 shrink-0" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

export { Select, SelectValue, SelectTrigger, SelectContent, SelectItem };

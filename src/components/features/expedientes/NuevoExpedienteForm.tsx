"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { FileText, Users, CalendarClock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { AbogadosIntervinientes } from "./AbogadosIntervinientes";
import { FUERO_OPTIONS, PROCESO_OPTIONS, ESTADO_OPTIONS } from "./types";

// TODO(etapa 2): reemplazar por los clientes reales del estudio (sección
// "Clientes"), igual que AMIGOS en AbogadosIntervinientes. Mock por ahora.
const CLIENTE_OPTIONS = [
  "Gayoso, Horacio",
  "Industrias del Sur SA",
  "Fernández, María",
  "Consorcio Av. Rivadavia 1234",
  "Rodríguez SA",
];

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof FileText;
  children: ReactNode;
}) {
  return (
    <section className="flex h-full flex-col rounded-xl border border-white/10 p-4 md:p-6">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-(--color-text-primary)">
        <Icon className="h-4 w-4 text-(--color-text-tertiary)" />
        {title}
      </h2>
      <div className="flex flex-1 flex-col gap-4">{children}</div>
    </section>
  );
}

/** Select de opción única con el mismo popup que los DropdownMenu de
 * Expedientes (ver select.tsx). Uncontrolled: participa en el submit del form
 * vía el <select> oculto que Radix Select renderiza para el prop `name`. */
function FieldSelect({
  id,
  name,
  options,
  placeholder = "Seleccionar…",
}: {
  id: string;
  name: string;
  options: string[];
  placeholder?: string;
}) {
  return (
    <Select name={name}>
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function Field({
  label,
  htmlFor,
  full,
  grow,
  children,
}: {
  label: string;
  htmlFor: string;
  full?: boolean;
  /** El campo crece para ocupar el resto del alto de la sección (Section es
   * flex-col); el hijo debe tener su propio flex-1 (Textarea, o el wrapper de
   * AbogadosIntervinientes). */
  grow?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5", full && "col-span-full", grow && "flex flex-1 flex-col")}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

/**
 * Formulario de alta de expediente. Migrado de CoreUI a shadcn/Tailwind, con
 * layout de producto: campos agrupados por sección (Identificación / Partes /
 * Estado y fechas), labels arriba y grid de hasta 3 columnas (xl:) para
 * aprovechar el ancho disponible sin necesitar un panel lateral. Campos no
 * controlados (se leen con FormData al enviar).
 * TODO(etapa 2, RF-10/11): validación + insert real contra Supabase.
 */
export function NuevoExpedienteForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    // TODO(etapa 2): validar y persistir en Supabase en vez de loguear.
    console.log("Nuevo expediente", data);
    router.push("/expedientes");
  };

  return (
    <form id="nuevo-expediente-form" onSubmit={handleSubmit} className="mt-4 w-full space-y-4 md:space-y-6">
      {/* Las 3 secciones lado a lado en pantallas anchas (en vez de apiladas):
         usa el ancho horizontal en vez de estirar campos, y baja mucho la
         altura total (menos scroll) al no apilar todo verticalmente.
         items-stretch: las 3 columnas quedan a la misma altura (la más alta
         marca el resto), en vez de cada una a su altura natural. */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
      <Section title="Identificación del expediente" icon={FileText}>
        <Field label="Carátula" htmlFor="caratula" full>
          <Input id="caratula" name="caratula" placeholder="Ej: Gayoso c/ Planiscig s/ Daños y perjuicios" />
        </Field>
        <Field label="Número de expediente" htmlFor="numeroExpediente">
          <Input id="numeroExpediente" name="numeroExpediente" placeholder="EXP-000" className="tabular-nums" />
        </Field>
        <Field label="Fuero" htmlFor="fuero">
          <FieldSelect id="fuero" name="fuero" options={FUERO_OPTIONS} />
        </Field>
        <Field label="Tipo de proceso" htmlFor="proceso">
          <FieldSelect id="proceso" name="proceso" options={PROCESO_OPTIONS} />
        </Field>
        <Field label="Secretaría" htmlFor="secretaria">
          <Input id="secretaria" name="secretaria" placeholder="Ej: Secretaría N° 24" />
        </Field>
        <Field label="Juzgado" htmlFor="juzgado" full>
          <Input id="juzgado" name="juzgado" placeholder="Ej: Juzgado Nacional en lo Civil N° 45" />
        </Field>
        {/* Juez debajo de Juzgado. Se usará para autocompletar la generación de
            documentos más adelante. */}
        <Field label="Juez" htmlFor="juez" full>
          <Input id="juez" name="juez" placeholder="Ej: Dr. Roberto Fernández" />
        </Field>
      </Section>

      <Section title="Partes" icon={Users}>
        <Field label="Actor" htmlFor="actor">
          <Input id="actor" name="actor" placeholder="Quién inicia el reclamo" />
        </Field>
        <Field label="Demandado" htmlFor="demandado">
          <Input id="demandado" name="demandado" placeholder="Contra quién se reclama" />
        </Field>
        <Field label="Cliente" htmlFor="cliente">
          <FieldSelect id="cliente" name="cliente" options={CLIENTE_OPTIONS} />
        </Field>
        <Field label="Abogados intervinientes" htmlFor="intervinientes-search" full grow>
          <AbogadosIntervinientes />
        </Field>
      </Section>

      <Section title="Estado y fechas" icon={CalendarClock}>
        <Field label="Fecha de inicio" htmlFor="fechaInicio">
          <DatePicker id="fechaInicio" name="fechaInicio" placeholder="Seleccionar fecha…" />
        </Field>
        <Field label="Estado" htmlFor="estado">
          <FieldSelect id="estado" name="estado" options={ESTADO_OPTIONS} />
        </Field>
        <Field label="Observaciones" htmlFor="observaciones" full grow>
          <Textarea
            id="observaciones"
            name="observaciones"
            placeholder="Notas internas sobre el expediente (opcional)"
            className="flex-1 resize-none"
          />
        </Field>
      </Section>
      </div>
    </form>
  );
}

"use client";

import { useEffect, useState } from "react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormLabel,
} from "@coreui/react";

interface FueroFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (nombre: string) => void;
  /** Nombre existente cuando se edita un fuero; vacío/undefined = alta. */
  initialValue?: string;
}

/**
 * Modal única para alta y edición de fueros (mismo patrón que
 * mockups/fueros.html: un solo campo "Nombre del fuero"). Se reutiliza desde
 * el botón "Nuevo fuero" del Topbar y desde el ícono de editar de cada fila.
 */
export function FueroFormModal({ visible, onClose, onSave, initialValue = "" }: FueroFormModalProps) {
  const [nombre, setNombre] = useState(initialValue);
  const isEdit = initialValue.trim().length > 0;

  // Resetea el campo cada vez que se abre, con el valor a editar (o vacío en alta).
  useEffect(() => {
    if (visible) setNombre(initialValue);
  }, [visible, initialValue]);

  const handleSave = () => {
    const trimmed = nombre.trim();
    if (!trimmed) return;
    onSave(trimmed);
    onClose();
  };

  return (
    <CModal visible={visible} onClose={onClose} alignment="center">
      <CModalHeader>
        <CModalTitle>{isEdit ? "Editar fuero" : "Nuevo fuero"}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormLabel htmlFor="fuero-nombre">Nombre del fuero</CFormLabel>
        <CFormInput
          id="fuero-nombre"
          autoFocus
          placeholder="Ej: Civil"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" variant="outline" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="info" className="text-white" onClick={handleSave}>
          Guardar fuero
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

"use client";

import { useRouter } from "next/navigation";
import {
    CInputGroup,
    CFormInput,
    CFormSelect,
    CButton,
    CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
    cilUser,
    cilNotes,
    cilBuilding,
    cilBriefcase,
    cilCalendar,
    cilTag,
    cilAccountLogout,
    cilContact,
    cilPeople,
    cilShieldAlt,
    cilFile,
    cilCommentSquare,
} from "@coreui/icons";

export default function NuevoExpedientePage() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Formulario enviado ✅");
        router.push("/");
    };

    const fueroOptions = ["Fuero A", "Fuero B", "Fuero C"];
    const procesoOptions = ["Proc A", "Proc B", "Proc C"];

    const campos = [
        { label: "Carátula", icon: cilNotes, type: "text" },
        { label: "Número de expediente", icon: cilTag, type: "text" },
        { label: "Fuero", icon: cilShieldAlt, type: "select", options: fueroOptions },
        { label: "Juzgado", icon: cilBuilding, type: "text" },
        { label: "Secretaría", icon: cilAccountLogout, type: "text" },
        { label: "Tipo de proceso", icon: cilBriefcase, type: "select", options: procesoOptions },
        { label: "Actor", icon: cilUser, type: "text" },
        { label: "Demandado", icon: cilPeople, type: "text" },
        { label: "Fecha de inicio", icon: cilCalendar, type: "text" },
        { label: "Estado", icon: cilFile, type: "text" },
        { label: "Abogado a cargo", icon: cilContact, type: "text" },
        { label: "Observaciones", icon: cilCommentSquare, type: "text" },
    ];

    return (
        <div className="flex items-center justify-center min-h-screen p-6">
            <form
                onSubmit={handleSubmit}
                className="text-white rounded-xl p-8 shadow-lg space-y-6 border border-white-200 max-w-3xl w-full bg-transparent"
            >
                {/* Header */}
                <h1 className="text-2xl font-bold text-white mb-6">Nuevo Expediente</h1>

                {/* Campos */}
                {campos.map((campo) => (
                    <CInputGroup key={campo.label} className="mb-3 border border-white-200 rounded-lg">
                        <CInputGroupText className="bg-transparent border-none text-white flex items-center gap-2 min-w-[200px]">
                            <CIcon icon={campo.icon} />
                            <span className="text-sm font-medium">{campo.label}</span>
                        </CInputGroupText>

                        {campo.type === "text" && (
                            <CFormInput
                                aria-label={campo.label}
                                className="bg-transparent text-white border border-white-200 rounded-lg focus:border-[#3d99f5] focus:ring-0"
                            />
                        )}

                        {campo.type === "select" && (
                            <CFormSelect
                                aria-label={campo.label}
                                className="bg-transparent text-white border border-white-200 rounded-lg focus:border-[#3d99f5] focus:ring-0 custom-select"
                            >
                                <option value="">Seleccione...</option>
                                {campo.options?.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </CFormSelect>
                        )}
                    </CInputGroup>
                ))}

                {/* Botones */}
                <div className="flex justify-end gap-2">
                    <CButton
                        color="secondary"
                        variant="outline"
                        onClick={() => router.push("/")}
                        className="text-white border-white hover:bg-white hover:text-black"
                    >
                        Volver
                    </CButton>
                    <CButton
                        type="submit"
                        color="info"
                        className="text-white font-semibold rounded-lg px-4 py-2"
                    >
                        Guardar expediente
                    </CButton>
                </div>
            </form>
        </div>
    );
}

"use client";

import { useState } from "react";
import {
    CFormCheck,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CInputGroup,
    CFormInput,
    CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilSearch } from "@coreui/icons";
import "../styles/Filter.css";

export const Filters = () => {
    // Estados de los dropdowns (ahora arrays para selección múltiple)
    const [fuero, setFuero] = useState<string[]>([]);
    const [proceso, setProceso] = useState<string[]>([]);
    const [estado, setEstado] = useState<string[]>([]);

    const fueroOptions = ["Fuero A", "Fuero B", "Fuero C", "Fuero D", "Fuero E", "Fuero F"];
    const procesoOptions = ["Proc A", "Proc B", "Proc C"];
    const estadoOptions = ["Al día", "Pendiente", "Urgente"];

    // Función para manejar selección múltiple
    const toggleOption = (option: string, selected: string[], setSelected: (s: string[]) => void) => {
        if (selected.includes(option)) {
            setSelected(selected.filter((o) => o !== option));
        } else {
            setSelected([...selected, option]);
        }
    };

    // Helper para mostrar texto en el toggle
    const getToggleText = (selected: string[]) => {
        return selected.length > 0 ? selected.join(" | ") : "Seleccionar";
    };

    return (
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl shadow-sm border border-white-200 mb-4">
            {/* Checkbox Archivados */}
            <div className="flex items-center gap-2 flex-none">
                <CFormCheck id="archivados" label="Archivados" className="custom-checkbox" />
            </div>

            {/* Dropdown Fuero */}
            <div className="flex items-center gap-2 min-w-0">
                <span className="text-base font-normal whitespace-nowrap">Fuero:</span>
                <CDropdown className="w-full custom-dropdown" autoClose={false}>
                    <CDropdownToggle
                        className="rounded-lg border border-white-200 text-left flex items-center justify-between px-2"
                        style={{ width: '250px', overflow: 'hidden' }} // ancho máximo fijo
                    >
                        <span
                            className="truncate"
                            style={{
                                display: 'inline-block',
                                maxWidth: '90%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                lineHeight: 1,          // elimina espacio vertical extra
                                verticalAlign: 'middle', // alinea con la flecha
                                padding: 0,              // asegura que no tenga padding
                                margin: 0,               // asegura que no tenga margen
                                paddingRight: '1px'
                            }}
                        >
                            {getToggleText(fuero)}
                        </span>
                    </CDropdownToggle>

                    <CDropdownMenu>
                        {fueroOptions.map((option) => (
                            <CDropdownItem key={option} className="flex items-center gap-2">
                                <CFormCheck
                                    checked={fuero.includes(option)}
                                    onChange={() => toggleOption(option, fuero, setFuero)}
                                    className="custom-checkbox m-0 mr-2"
                                />
                                {option}
                            </CDropdownItem>

                        ))}
                    </CDropdownMenu>
                </CDropdown>

            </div>

            {/* Dropdown Proceso */}
            <div className="flex items-center gap-2 min-w-0">
                <span className="text-base font-normal whitespace-nowrap">Proceso:</span>
                <CDropdown className="w-full custom-dropdown" autoClose={false}>
                    <CDropdownToggle
                        className="rounded-lg border border-white-200 text-left flex items-center justify-between px-2"
                        style={{ width: '250px', overflow: 'hidden' }} // ancho máximo fijo
                    >
                        <span
                            className="truncate"
                            style={{
                                display: 'inline-block',
                                maxWidth: '90%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                lineHeight: 1,          // elimina espacio vertical extra
                                verticalAlign: 'middle', // alinea con la flecha
                                padding: 0,              // asegura que no tenga padding
                                margin: 0,               // asegura que no tenga margen
                                paddingRight: '1px'
                            }}
                        >
                            {getToggleText(proceso)}
                        </span>
                    </CDropdownToggle>

                    <CDropdownMenu>
                        {procesoOptions.map((option) => (
                            <CDropdownItem key={option} className="flex items-center gap-4">
                                <CFormCheck
                                    id={option}
                                    checked={proceso.includes(option)}
                                    onChange={() => toggleOption(option, proceso, setProceso)}
                                    className="custom-checkbox m-0 mr-2" // mr-2 agrega separación del texto
                                />
                                {option}
                            </CDropdownItem>
                        ))}
                    </CDropdownMenu>
                </CDropdown>
            </div>

            {/* Dropdown Estado */}
            <div className="flex items-center gap-2 min-w-0">
                <span className="text-base font-normal whitespace-nowrap">Estado:</span>
                <CDropdown className="w-full custom-dropdown" autoClose={false}>
                    <CDropdownToggle
                        className="rounded-lg border border-white-200 text-left flex items-center justify-between px-2"
                        style={{ width: '250px', overflow: 'hidden' }} // ancho máximo fijo
                    >
                        <span
                            className="truncate"
                            style={{
                                display: 'inline-block',
                                maxWidth: '90%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                lineHeight: 1,          // elimina espacio vertical extra
                                verticalAlign: 'middle', // alinea con la flecha
                                padding: 0,              // asegura que no tenga padding
                                margin: 0,               // asegura que no tenga margen
                                paddingRight: '1px'
                            }}
                        >
                            {getToggleText(estado)}
                        </span>
                    </CDropdownToggle>

                    <CDropdownMenu>
                        {estadoOptions.map((option) => (
                            <CDropdownItem key={option} className="flex items-center gap-4">
                                <CFormCheck
                                    checked={estado.includes(option)}
                                    onChange={() => toggleOption(option, estado, setEstado)}
                                    className="custom-checkbox m-0 mr-2" // mr-2 agrega separación del texto
                                />
                                {option}
                            </CDropdownItem>
                        ))}
                    </CDropdownMenu>
                </CDropdown>
            </div>

            {/* Input Carátula */}
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <span className="text-base font-normal whitespace-nowrap">Carátula:</span>
                <CInputGroup className="w-full rounded-lg border border-white-200 custom-input">
                    <CFormInput className="rounded-lg" />
                </CInputGroup>
            </div>

            {/* Input Nro Expediente */}
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <span className="text-base font-normal whitespace-nowrap">Nro Expediente:</span>
                <CInputGroup className="w-full rounded-lg border border-white-200 custom-input">
                    <CFormInput className="rounded-lg" />
                </CInputGroup>
            </div>

            {/* Botón Search */}
            <div className="flex items-center gap-2 flex-none">
                <CButton className="text-white flex items-center gap-2 rounded-lg px-4" color="info">
                    Search
                    <CIcon icon={cilSearch} className="mx-2" />
                </CButton>
            </div>
        </div>
    );
};

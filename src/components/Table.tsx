import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CButton } from "@coreui/react";
import { TableRow } from "./TableRow";
import { Pagination } from "./Pagination";
import { useState } from "react";
import CIcon from "@coreui/icons-react";
import { cilPlus } from "@coreui/icons";
import "../styles/Table.css";
export const Table = () => {
    const [page, setPage] = useState(1);

    const data = [
        { caratula: "Gayoso vs Planiscig: Patentamiento sitio web aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", expediente: "EXP-001", fuero: "Fuero A", proceso: "Proc A", estado: { label: "Al día", color: "success" } },
        { caratula: "Gayoso vs Planiscig: Patentamiento sitio web", expediente: "EXP-002", fuero: "Fuero B", proceso: "Proc B", estado: { label: "Pendientes", color: "warning" } },
        { caratula: "Gayoso vs Planiscig: Patentamiento sitio web", expediente: "EXP-003", fuero: "Fuero C", proceso: "Proc C", estado: { label: "Urgente", color: "danger" } },
        { caratula: "Gayoso vs Planiscig: Patentamiento sitio web", expediente: "EXP-004", fuero: "Fuero D", proceso: "Proc D", estado: { label: "Inactivo", color: "secondary" } },
        { caratula: "Gayoso vs Planiscig: Patentamiento sitio web", expediente: "EXP-005", fuero: "Fuero E", proceso: "Proc E", estado: { label: "Listo para cobro", color: "info" } },
    ];

    return (
        <div className="relative flex flex-col w-full h-full">
            {/* Contenedor de la tabla con scroll solo en rows */}
            <div className="flex-1 overflow-y-auto w-full p-2">
                <CTable striped hover responsive style={{ tableLayout: 'fixed' }}>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell style={{ width: '40%' }}>Carátula</CTableHeaderCell>
                            <CTableHeaderCell style={{ width: '15%' }}>Expediente</CTableHeaderCell>
                            <CTableHeaderCell style={{ width: '15%' }}>Fuero</CTableHeaderCell>
                            <CTableHeaderCell style={{ width: '15%' }}>Proceso</CTableHeaderCell>
                            <CTableHeaderCell style={{ width: '10%' }}>Estado</CTableHeaderCell>
                            <CTableHeaderCell style={{ width: '5%' }}>Acciones</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {data.map((row) => (
                            <TableRow key={row.expediente} {...row} />
                        ))}
                    </CTableBody>
                </CTable>

            </div>

            {/* Paginación debajo de la tabla */}
            <div className="d-flex justify-content-center my-3">
                <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
            </div>

            {/* Botón flotante de + */}
            <CButton
                color="info"
                shape="rounded-circle"
                style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "20px",
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                }}
                className="border border-white"
            >
                <CIcon icon={cilPlus} style={{ width: "25px", height: "25px", color: "white" }} />
            </CButton>
        </div>
    );
};

// TableRow.tsx
import { CBadge, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CTableRow, CTableDataCell } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilOptions } from "@coreui/icons";
import "../styles/TableRow.css"
interface TableRowProps {
    caratula: string;
    expediente: string;
    fuero: string;
    proceso: string;
    estado: {
        label: string;
        color: string; // success, warning, danger, secondary, info, etc.
    };
}

export const TableRow: React.FC<TableRowProps> = ({
    caratula,
    expediente,
    fuero,
    proceso,
    estado,
}) => {
    return (
        <CTableRow>
            <CTableDataCell className="align-middle">
                <div className="truncate">{caratula}</div>
            </CTableDataCell>
            <CTableDataCell className="align-middle">{expediente}</CTableDataCell>
            <CTableDataCell className="align-middle">{fuero}</CTableDataCell>
            <CTableDataCell className="align-middle">{proceso}</CTableDataCell>
            <CTableDataCell className="align-middle">
                <CBadge
                    color={estado.color}
                    className="w-[120px] text-center group-hover:text-white"
                    style={{ fontSize: '0.85rem', fontWeight: 600 }}
                >
                    {estado.label}
                </CBadge>
            </CTableDataCell>
            <CTableDataCell className="align-middle">
                <CDropdown className="custom-dropdown ml-3">
                    <CDropdownToggle caret={false}>
                        <CIcon icon={cilOptions} className="group-hover:text-white" />
                    </CDropdownToggle>
                    <CDropdownMenu className="custom-dropdown-menu">
                        <CDropdownItem>Ver expediente</CDropdownItem>
                        <CDropdownItem>Cambiar estado</CDropdownItem>
                        <CDropdownItem>Archivar</CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
            </CTableDataCell>
        </CTableRow>
    );
};

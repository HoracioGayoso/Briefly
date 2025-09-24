import '../styles/Pagination.css';
import { CPagination, CPaginationItem } from "@coreui/react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const hasNext = currentPage + 1 < totalPages;

    return (
        <CPagination align="center" aria-label="Page navigation" className="custom-pagination">
            {/* Primera página */}
            <CPaginationItem disabled={currentPage === 1} onClick={() => onPageChange(1)}>
                &lt;&lt;
            </CPaginationItem>

            {/* Página anterior */}
            <CPaginationItem disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                &lt;
            </CPaginationItem>

            {/* Página actual */}
            <CPaginationItem active>{currentPage}</CPaginationItem>

            {/* Página siguiente */}
            {currentPage < totalPages && (
                <CPaginationItem onClick={() => onPageChange(currentPage + 1)}>
                    {currentPage + 1}
                </CPaginationItem>
            )}

            {/* Puntos suspensivos */}
            {hasNext && currentPage + 1 < totalPages - 1 && (
                <CPaginationItem disabled>...</CPaginationItem>
            )}

            {/* Última página */}
            {totalPages > 1 &&
                currentPage !== totalPages &&
                currentPage + 1 !== totalPages && (
                    <CPaginationItem onClick={() => onPageChange(totalPages)}>
                        {totalPages}
                    </CPaginationItem>
                )}

            {/* Página siguiente */}
            <CPaginationItem disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                &gt;
            </CPaginationItem>

            {/* Última página */}
            <CPaginationItem disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)}>
                &gt;&gt;
            </CPaginationItem>
        </CPagination>
    );
};

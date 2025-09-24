"use client";

import { useState } from "react";
import {
    CSidebar,
    CSidebarBrand,
    CSidebarHeader,
    CSidebarNav,
    CNavItem,
    CSidebarToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBalanceScale, cilCheck, cilFolder, cilNotes, cilPlaylistAdd, cilSettings, cilTask } from "@coreui/icons";
import "../styles/Sidebar.css";
export default function Sidebar() {
    const [unfoldable, setUnfoldable] = useState(true);

    return (
        <CSidebar
            unfoldable={unfoldable}
            className="border-end mx-2 "
            style={{ position: "sticky", top: 0, minWidth: "4.9rem" }}
        >
            <CSidebarHeader className="px-3 py-4 border-bottom">
                <CSidebarBrand className="text-base font-semibold tracking-wide">
                    Briefly
                </CSidebarBrand>
            </CSidebarHeader>
            <CSidebarNav className="px-2 py-3">
                <CNavItem
                    href="#"
                    className="py-2 rounded-md hover:bg-black/[.04] dark:hover:bg-white/[.06] transition-colors"
                >
                    <CIcon
                        customClassName="nav-icon icon-primary-blue"
                        icon={cilFolder}
                        color="info"
                    />
                    <span className="ms-3">Expedientes</span>
                </CNavItem>
                <CNavItem
                    href="#"
                    className="py-2 rounded-md hover:bg-black/[.04] dark:hover:bg-white/[.06] transition-colors"
                >
                    <CIcon
                        customClassName="nav-icon icon-primary-blue"
                        icon={cilBalanceScale}
                        color="info"
                    />
                    <span className="ms-3">Crear Fuero</span>
                </CNavItem>
                <CNavItem
                    href="#"
                    className="py-2 rounded-md hover:bg-black/[.04] dark:hover:bg-white/[.06] transition-colors"
                >
                    <CIcon
                        customClassName="nav-icon icon-primary-blue"
                        icon={cilPlaylistAdd}
                        color="info"
                    />
                    <span className="ms-3">Crear Proceso</span>
                </CNavItem>
            </CSidebarNav>
            <CSidebarHeader className="border-top">
                <CSidebarToggler
                    onClick={() => setUnfoldable((prev) => !prev)}
                    className="mx-auto sidebar-togler-blue"
                ></CSidebarToggler>
            </CSidebarHeader>
        </CSidebar>
    );
}

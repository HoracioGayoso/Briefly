import Sidebar from "@/components/Sidebar";
import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`${inter.variable} antialiased flex h-screen`}>
            <Sidebar />
            <main className="flex-1 p-8 flex flex-col overflow-auto">
                {children}
            </main>
        </div>
    );
}
"use client";

import Link from "next/link";

export default function TeslaNav() {
    return (
        <header className="fixed top-0 inset-x-0 z-40">
            <nav className="wrap h-16 flex items-center justify-between">
                <Link href="/" className="text-lg font-semibold tracking-wide">
                    Tesla Roast
                </Link>
                <div className="flex items-center gap-3">
                    <Link href="/sample0data" className="btn btn-ghost">Sample Mode</Link>
                    <Link href="/dashboard" className="btn btn-primary">Dashboard</Link>
                </div>
            </nav>
        </header>
    );
}
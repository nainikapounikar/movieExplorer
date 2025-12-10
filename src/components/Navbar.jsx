import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 shadow-sm">
            <div className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/40 dark:border-gray-800/40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-16 flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold shadow-md">
                                ME
                            </div>
                            <span className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
                                MovieExplorer
                            </span>
                        </Link>

                        {/* Desktop Links */}
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                            <Link
                                to="/"
                                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                            >
                                Home
                            </Link>
                            <Link
                                to="/watchlist"
                                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                            >
                                Watchlist
                            </Link>
                            <Link
                                to="/add"
                                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                            >
                                Add
                            </Link>
                        </nav>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                            onClick={() => setOpen(!open)}
                            aria-label="Toggle navigation menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                {open ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                {open && (
                    <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl">
                        <div className="px-4 py-3 flex flex-col gap-3 text-base">
                            <Link
                                to="/"
                                onClick={() => setOpen(false)}
                                className="py-2 hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                                Home
                            </Link>
                            <Link
                                to="/watchlist"
                                onClick={() => setOpen(false)}
                                className="py-2 hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                                Watchlist
                            </Link>
                            <Link
                                to="/add"
                                onClick={() => setOpen(false)}
                                className="py-2 hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                                Add
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * Props:
 * - initialQuery (optional) string
 * - onSearch(query: string) required callback (Navbar won't do API calls)
 */
export default function Navbar({ initialQuery = "", onSearch }) {
    const [localQuery, setLocalQuery] = useState(initialQuery);

    // If parent changes initialQuery (rare) — reflect it
    useEffect(() => setLocalQuery(initialQuery), [initialQuery]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(localQuery.trim());
    };

    return (
        <header className="navbar-shared" style={{ padding: 16 }}>
            <div className="navbar-row" style={{ display: "flex", gap: 12, alignItems: "center" }}>
                {/* hamburger / logo area (kept minimal) */}
                <button className="hamburger-btn" aria-label="menu" style={{ fontSize: 20 }}>
                    ☰
                </button>

                {/* Brand */}
                <Link to="/" className="brand" style={{ fontWeight: 700, color: "#fff", textDecoration: "none", fontSize: 20 }}>
                    MovieHouse
                </Link>

                {/* Search form - will expand */}
                <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, alignItems: "center", flex: 1 }}>
                    <input
                        value={localQuery}
                        onChange={(e) => setLocalQuery(e.target.value)}
                        placeholder="Search movies..."
                        aria-label="Search movies"
                        style={{
                            flex: 1,
                            padding: "10px 14px",
                            borderRadius: 8,
                            border: "1px solid #444",
                            background: "#111",
                            color: "#fff",
                            minWidth: 120
                        }}
                    />

                    {/* small controls can be added here if desired, keep only search button as you requested */}
                    <button type="submit" aria-label="Search" style={{ padding: "8px 12px", borderRadius: 8 }}>
                        🔍
                    </button>
                </form>

                {/* Watchlist button on right */}
                <Link to="/watchlist" className="watchlist-link" style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: "#fff",
                    color: "#000",
                    textDecoration: "none",
                    fontWeight: 600
                }}>
                    + Watchlist
                </Link>
            </div>
        </header>
    );
}

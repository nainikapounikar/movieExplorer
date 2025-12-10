import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";
import useWatchlist from "../hooks/useWatchlist";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY || "17ebbfe5";
const PAGE_SIZE = 10;

export default function Home() {
    const [query, setQuery] = useState("");
    const [type, setType] = useState("");
    const [year, setYear] = useState("");
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
    const location = useLocation();

    // If another page navigated here with a search (via location.state.q), apply it once
    useEffect(() => {
        if (location?.state?.q) {
            const incoming = String(location.state.q || "").trim();
            if (incoming) {
                setQuery(incoming);
                setPage(1);
                // remove the state so repeated back/forward doesn't reapply automatically
                window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchPage() {
            setLoading(true);
            setErrorMsg("");
            try {
                const url = new URL("https://www.omdbapi.com/");
                url.searchParams.set("apikey", API_KEY);

                // Use "movie" as default search term if query is empty
                const searchTerm = query.trim() || "movie";
                url.searchParams.set("s", searchTerm);
                url.searchParams.set("page", page);
                if (type) url.searchParams.set("type", type);
                if (year) url.searchParams.set("y", year);

                const res = await fetch(url.toString(), { signal: controller.signal });
                const data = await res.json();
                if (data.Response === "False") {
                    setMovies([]);
                    setTotalResults(0);
                    setErrorMsg(data.Error || "Movie not found.");
                } else {
                    setMovies(data.Search || []);
                    setTotalResults(parseInt(data.totalResults || "0", 10));
                    setErrorMsg("");
                }
            } catch (err) {
                if (err.name !== "AbortError") setErrorMsg("Network error");
            } finally {
                setLoading(false);
            }
        }

        fetchPage();
        return () => controller.abort();
    }, [query, page, type, year]);

    const totalPages = Math.ceil(totalResults / PAGE_SIZE);

    return (
        <div className="app-bg">
            {/* Sticky header wrapper */}
            <div className="sticky-header">
                {/* Mobile Search Bar */}
                {/* Mobile Header + Search (mobile only) */}
                <div className="mobile-search-container">
                    <div className="mobile-header-row">
                        <h1 className="mobile-title">Movie Explorer</h1>

                        <button
                            className="mobile-hamburger"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            ☰
                        </button>
                    </div>

                    <form
                        className="mobile-search-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setPage(1);
                        }}
                    >
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="mobile-search-input"
                            placeholder="Search movies..."
                        />
                        <button type="submit" className="mobile-search-btn" aria-label="Search">
                            🔍
                        </button>
                    </form>

                    {mobileMenuOpen && (
                        <div className="mobile-menu-box">
                            <button
                                className="mobile-menu-item"
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    setType("");
                                    setPage(1);
                                }}
                            >
                                🏠 Home
                            </button>
                            <Link
                                to="/watchlist"
                                className="mobile-menu-item"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                + Watchlist
                            </Link>
                        </div>
                    )}
                </div>

                {/* Desktop header + navbar */}
                <div className="container py-4 header-container">
                    <h1 className="mb-4 desktop-title d-none d-md-block">Movie Explorer</h1>

                    <nav className="navbar-custom desktop-navbar">
                        <div className="desktop-row">
                            <form
                                className="search-form-nav"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setPage(1);
                                }}
                            >
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="form-control search-input-nav"
                                    placeholder="Search movies..."
                                />

                                <select
                                    className="form-select search-select-nav"
                                    value={type}
                                    onChange={(e) => {
                                        setType(e.target.value);
                                        setPage(1);
                                    }}
                                >
                                    <option value="">All</option>
                                    <option value="movie">Movies</option>
                                    <option value="series">TV Shows</option>
                                </select>

                                <input
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    placeholder="Year"
                                    className="form-control search-year-nav"
                                />

                                <button
                                    type="submit"
                                    className="btn btn-primary search-btn-nav"
                                >
                                    Search
                                </button>
                            </form>

                            <div className="nav-right-desktop">
                                <Link to="/watchlist" className="watchlist-btn-desktop">
                                    + Watchlist
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Main content scrolls under the sticky header */}
            <div className="container py-4 main-content">


                {errorMsg && <div className="alert alert-warning mt-3">{errorMsg}</div>}
                {loading ? (
                    <div className="loading-text">Loading...</div>
                ) : (
                    <>
                        <MovieList
                            movies={movies}
                            addToWatchlist={addToWatchlist}
                            removeFromWatchlist={removeFromWatchlist}
                            isInWatchlist={isInWatchlist}
                        />
                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </>
                )}
            </div>

            <footer className="app-footer">
                <div className="container footer-inner">
                    <div className="footer-left">
                        © 2025 Movie Explorer
                    </div>

                    <div className="footer-right">
                        Designed & Developed by
                        <a
                            href="https://kavyainfoweb.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                        >
                            &nbsp;Kavya Info Web
                        </a>
                    </div>
                </div>
            </footer>

        </div>
    );
}
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useWatchlist from '../hooks/useWatchlist';
import MovieList from '../components/MovieList';

export default function WatchlistPage() {
    const { watchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

                    {mobileMenuOpen && (
                        <div className="mobile-menu-box">
                            <Link
                                to="/"
                                className="mobile-menu-item"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                🏠 Home
                            </Link>
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
                            <div className="search-form-nav">
                                {/* Empty space to maintain layout */}
                            </div>

                            <div className="nav-right-desktop">
                                <Link to="/" className="watchlist-btn-desktop" style={{ marginRight: '8px' }}>
                                    🏠 Home
                                </Link>
                                <Link to="/watchlist" className="watchlist-btn-desktop">
                                    + Watchlist
                                </Link>
                            </div>
                        </div>
                    </nav>

                    {/* Mobile menu overlay stays inside sticky wrapper so it anchors to top */}

                </div>
            </div>

            {/* Main content scrolls under the sticky header */}
            <div className="container py-4 main-content">
                <h2 className="mb-4" style={{ color: '#ffffff' }}>My Watchlist</h2>
                {watchlist.length === 0 ? (
                    <p>No movies saved.</p>
                ) : (
                    <MovieList
                        movies={watchlist}
                        addToWatchlist={() => { }}
                        removeFromWatchlist={removeFromWatchlist}
                        isInWatchlist={isInWatchlist}
                    />
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
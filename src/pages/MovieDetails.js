import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useWatchlist from '../hooks/useWatchlist';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY || '17ebbfe5';

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

    useEffect(() => {
        let mounted = true;
        async function fetchDetails() {
            setLoading(true);
            setErrorMsg('');
            try {
                const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
                const data = await res.json();
                if (data.Response === 'False') setErrorMsg(data.Error || 'Not found');
                else if (mounted) setMovie(data);
            } catch {
                setErrorMsg('Network error');
            } finally {
                setLoading(false);
            }
        }
        fetchDetails();
        return () => { mounted = false; };
    }, [id]);

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
                {loading ? (
                    <div className="loading-text">Loading...</div>
                ) : errorMsg ? (
                    <div className="alert alert-warning">{errorMsg}</div>
                ) : (
                    <>
                        <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>← Back</button>
                        <div className="row">
                            <div className="col-md-4">
                                {movie.Poster && movie.Poster !== 'N/A' ? (
                                    <img src={movie.Poster} alt={movie.Title} className="img-fluid" />
                                ) : (
                                    <div style={{ height: 400 }} />
                                )}
                            </div>
                            <div className="col-md-8">
                                <h2>{movie.Title} ({movie.Year})</h2>
                                <p><strong>Genre:</strong> {movie.Genre}</p>
                                <p><strong>Runtime:</strong> {movie.Runtime}</p>
                                <p><strong>Director:</strong> {movie.Director}</p>
                                <p><strong>Actors:</strong> {movie.Actors}</p>
                                <p><strong>Rating:</strong> {movie.imdbRating} / {movie.imdbVotes}</p>
                                <p><strong>Plot:</strong> {movie.Plot}</p>

                                {isInWatchlist(movie.imdbID) ? (
                                    <button className="btn btn-danger" onClick={() => removeFromWatchlist(movie.imdbID)}>
                                        Remove from Watchlist
                                    </button>
                                ) : (
                                    <button className="btn btn-primary" onClick={() => addToWatchlist(movie)}>
                                        Add to Watchlist
                                    </button>
                                )}
                            </div>
                        </div>
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
import React from 'react';
import useWatchlist from '../hooks/useWatchlist';
import MovieList from '../components/MovieList';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function WatchlistPage() {
    const { watchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

    return (
        <div className="app-bg">
            <div className="container py-4">
                <h1 className="mb-4">My Watchlist</h1>

                <Navbar
                    showSearch={false}
                    currentPage="watchlist"
                />

                <div className="watchlist-content">
                    {watchlist.length === 0 ? (
                        <div className="empty-state">
                            <p className="empty-text">No movies in your watchlist yet.</p>
                            <p className="empty-subtext">Start adding movies to keep track of what you want to watch!</p>
                        </div>
                    ) : (
                        <MovieList
                            movies={watchlist}
                            addToWatchlist={() => { }}
                            removeFromWatchlist={removeFromWatchlist}
                            isInWatchlist={isInWatchlist}
                        />
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
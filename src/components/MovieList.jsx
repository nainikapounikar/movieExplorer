import React from 'react';
import MovieCard from './MovieCard';

export default function MovieList({ movies = [], addToWatchlist, removeFromWatchlist, isInWatchlist }) {
    if (!movies || movies.length === 0) {
        return <div className="text-center mt-4">No movies to show.</div>;
    }

    return (
        <div className="row g-3">
            {movies.map(movie => (
                <div key={movie.imdbID} className="col-sm-6 col-md-4 col-lg-3">
                    <MovieCard
                        movie={movie}
                        onAdd={addToWatchlist}
                        onRemove={removeFromWatchlist}
                        inWatchlist={isInWatchlist(movie.imdbID)}
                    />
                </div>
            ))}
        </div>

    );
}

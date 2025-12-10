import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function MovieCard({ movie, onAdd, onRemove, inWatchlist }) {
    // OMDb returns Poster = "N/A" when no poster exists
    const poster = movie?.Poster && movie.Poster !== 'N/A' ? movie.Poster : null;

    return (
        <div className="card h-100">
            {poster ? (
                <img src={poster} className="card-img-top" alt={movie.Title} style={{ height: 300, objectFit: 'cover' }} />
            ) : (
                <div style={{ height: 300 }}>
                    <Skeleton height={300} />
                </div>
            )}
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.Title || <Skeleton />}</h5>
                <p className="card-text mb-2">{movie.Year || <Skeleton width={60} />}</p>

                <div className="mt-auto">
                    {inWatchlist ? (
                        <button className="btn btn-danger btn-sm me-2" onClick={() => onRemove(movie.imdbID)}>Remove</button>
                    ) : (
                        <button className="btn btn-primary btn-sm me-2" onClick={() => onAdd(movie)}>Add</button>
                    )}
                    <a className="btn btn-outline-secondary btn-sm" href={`/movie/${movie.imdbID}`}>Details</a>
                </div>
            </div>
        </div>
    );
}

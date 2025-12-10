import { useEffect, useState } from 'react';

const STORAGE_KEY = 'my_watchlist_v1';

export default function useWatchlist() {
    const [watchlist, setWatchlist] = useState(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (movie) => {
        if (!watchlist.some(m => m.imdbID === movie.imdbID)) {
            setWatchlist(prev => [...prev, movie]);
        }
    };

    const removeFromWatchlist = (imdbID) => {
        setWatchlist(prev => prev.filter(m => m.imdbID !== imdbID));
    };

    const isInWatchlist = (imdbID) => watchlist.some(m => m.imdbID === imdbID);

    return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
}

import React from 'react';

export default function Pagination({ page, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const handle = (p) => () => onPageChange(Math.max(1, Math.min(totalPages, p)));

    const pages = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);
    for (let i = start; i <= end; i++) pages.push(i);

    return (
        <nav aria-label="Page navigation" className="mt-5 mb-3">

            <ul className="pagination justify-content-center">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}><button className="page-link" onClick={handle(1)}>First</button></li>
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}><button className="page-link" onClick={handle(page - 1)}>Prev</button></li>
                {pages.map(p => (
                    <li key={p} className={`page-item ${p === page ? 'active' : ''}`}>
                        <button className="page-link" onClick={handle(p)}>{p}</button>
                    </li>
                ))}
                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}><button className="page-link" onClick={handle(page + 1)}>Next</button></li>
                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}><button className="page-link" onClick={handle(totalPages)}>Last</button></li>
            </ul>
        </nav>
    );
}

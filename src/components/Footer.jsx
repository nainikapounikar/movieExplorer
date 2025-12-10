// File: src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';


export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full z-40">
            <div className="backdrop-blur bg-white/60 dark:bg-gray-900/60 border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-16 flex items-center justify-between">
                        <div className="text-sm text-gray-700 dark:text-gray-300">© {new Date().getFullYear()} MovieHouse</div>
                        <div className="flex items-center gap-3">
                            <Link to="/about" className="text-sm hover:underline">About</Link>
                            <Link to="/privacy" className="text-sm hover:underline">Privacy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
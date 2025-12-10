// File: src/components/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';



// Layout sets up top/bottom fixed bars and content padding so everything remains visible and responsive
export default function Layout({ children }) {
    // header and footer height: 64px / h-16
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Navbar />


            {/* padding top & bottom equal to header/footer heights */}
            <main className="pt-16 pb-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
            </main>


            <Footer />
        </div>
    );
}
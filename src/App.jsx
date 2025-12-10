import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';


function Home() {
    return (
        <div className="py-8">
            <h1 className="text-2xl font-bold mb-4">Home</h1>
            <p className="text-sm">Responsive modern layout with sticky header & footer.</p>
        </div>
    );
}


function Watchlist() {
    return (
        <div className="py-8">
            <h1 className="text-2xl font-bold mb-4">Watchlist</h1>
            <p className="text-sm">Your saved movies.</p>
        </div>
    );
}


export default function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/watchlist" element={<Watchlist />} />
                </Routes>
            </Layout>
        </Router>
    );
}
import React from 'react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="app-footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-left">
                        <p>© {currentYear} MovieExplorer</p>
                    </div>
                    <div className="footer-right">
                        <p>Designed & Developed by <span className="developer-name">Kavya Infoweb</span></p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
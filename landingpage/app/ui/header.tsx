import React from 'react';
import Logo from './logo';

const Header: React.FC = () => {
    return (
        <header className="sticky top-0 bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16">
                <div className="flex-shrink-0">
                    <Logo/>
                </div>
            </div>
        </header>
    );
};

export default Header;
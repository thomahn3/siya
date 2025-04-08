import React from 'react';
import Logo from './logo';

interface HeaderProps {
    children?: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
    return (
        <header className="sticky top-0 bg-white shadow-md z-50">
            <div className="max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center h-16">
                <div className="ml-4 flex-shrink-0">
                    <Logo />
                </div>
                <div dir="rtl" className="absolute start-0 inset-y-0 space-x-5 mr-20 flex items-center">
                    {children}
                </div>
            </div>
        </header>
    );
}

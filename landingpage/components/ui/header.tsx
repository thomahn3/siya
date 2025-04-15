import React from 'react';
import Logo from './logo';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { checkProfileSetup, userRedirect } from '@/lib/actions';


interface HeaderProps {
    children?: React.ReactNode;
}

export default async function Header({ children }: HeaderProps) {

    return (
        <header className="sticky top-0 bg-white shadow-md z-50">
            <div className="max-w-screen px-4 sm:px-6 lg:px-8 flex flex-row items-center h-16">
                <div className="ml-4 flex-shrink-0">
                    <Link href={"/"}><Logo /></Link>
                </div>
                {children}
            </div>
        </header>
    );
}

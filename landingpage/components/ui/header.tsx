import React from 'react';
import Logo from './logo';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { checkProfileSetup } from '@/lib/actions';


interface HeaderProps {
    children?: React.ReactNode;
}

export default async function Header({ children }: HeaderProps) {

    const session = await auth();
      if (session && (await checkProfileSetup(session.user?.id))) {
        var link = "/dashboard"
      } else {
        var link = "/"
      }

    return (
        <header className="sticky top-0 bg-white shadow-md z-50">
            <div className="max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center h-16">
                <div className="ml-4 flex-shrink-0">
                    <Link href={"/"}><Logo /></Link>
                </div>
                <div dir="rtl" className="absolute start-0 inset-y-0 space-x-5 mr-20 flex items-center">
                    {children}
                </div>
            </div>
        </header>
    );
}

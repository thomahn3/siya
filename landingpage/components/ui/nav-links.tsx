'use client';

import { LayoutDashboard, UserRoundSearch, SquarePlus, Inbox, CircleUserRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Session } from 'next-auth';

// Map of links to display in the side navigation.


export default function NavLinks({ session, userType }: { session: Session | null; userType: string }) {
    const pathname = usePathname();

    let links: any[] = [];
    
    if (userType === 'request') {
        links = [
            { name: 'Home', href: '/dashboard-customer', icon: LayoutDashboard },
            { name: 'Find a Contractor', href: '/offer-job/posts', icon: UserRoundSearch },
            { name: 'Make a Post', href: '/request-job', icon: SquarePlus },
            { name: 'Inbox', href: '/inbox', icon: Inbox },
        ];
    } else if (userType === 'offer') {
        links = [
            { name: 'Home', href: '/dashboard-contractor', icon: LayoutDashboard },
            { name: 'Find Customers', href: '/request-job/posts', icon: UserRoundSearch },
            { name: 'Make a Post', href: '/offer-job', icon: SquarePlus },
            { name: 'Inbox', href: '/inbox', icon: Inbox },
        ];
    }

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center space-x-2 text-sm font-medium rounded-md hover:bg-green-50 hover:text-green-500 md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-green-100 text-green-500': pathname === link.href,
                            }
                        )}
                    >
                        <div className="flex items-center justify-center w-full md:w-auto">
                            <LinkIcon className="w-6" />
                        </div>
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
            <div className="hidden h-auto grow rounded-md md:block"></div>
            <Link 
            href={`/account/${session?.user?.id}`}
            className={clsx(
                'flex h-[48px] grow items-center justify-center space-x-2 text-sm font-medium rounded-md hover:bg-green-50 hover:text-green-500 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                    'bg-green-100 text-green-500': pathname === `/account/${session?.user?.id}`,
                }
            )}>
                <div className="flex items-center justify-center w-full md:w-auto">
                            <CircleUserRound className="w-6" />
                        </div>
                        <p className="hidden md:block">Profile</p>
       
            </Link>
        </>
    );
}
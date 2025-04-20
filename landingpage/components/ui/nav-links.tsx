'use client';

import { LayoutDashboard, UserRoundSearch, SquarePlus, Inbox, CircleUserRound, Power } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Session } from 'next-auth';
import { signOutServer } from '@/lib/actions';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { sign } from 'crypto';

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
            { name: 'Profile', href: `/account/${session?.user?.id}`, icon: CircleUserRound},
        ];
    } else if (userType === 'offer') {
        links = [
            { name: 'Home', href: '/dashboard-contractor', icon: LayoutDashboard },
            { name: 'Find Customers', href: '/request-job/posts', icon: UserRoundSearch },
            { name: 'Make a Post', href: '/offer-job', icon: SquarePlus },
            { name: 'Inbox', href: '/inbox', icon: Inbox },
            { name: 'Profile', href: `/account/${session?.user?.id}`, icon: CircleUserRound},
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
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}

export async function SignOut() {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                    <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-100 hover:text-green-500 md:flex-none md:justify-start md:p-2 md:px-3">
                        <Power className="w-6" />
                        <div className="hidden md:block">Sign Out</div>
                    </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You will be signed out of your account and redirected to the sign-in page.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={async () => {
                            await signOutServer();
                        }}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
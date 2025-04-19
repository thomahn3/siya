import Link from 'next/link';
import Logo from '@/components/ui/logo';
import { Power, CircleUserRound } from 'lucide-react';
import { signOut } from '@/lib/auth';
import { userRedirect } from '@/lib/actions';
import { Session } from 'next-auth';
import NavLinks from '@/components/ui/nav-links';
import { Button } from './ui/button';

export default async function SideNav({ session }: { session: Session | null }) {
    
    const userType = await userRedirect({ session }, true) as string
  
    return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gray-50 border-r border-gray-200 shadow-md">
      <Link
        className="hidden md:mb-2 md:flex md:justify-center md:place-items-center md:p-4"
        href="/"
      >
        <div className="">
          <Logo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks userType={userType} />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>

        <form
          action={async () => {
            'use server';
            await signOut()
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-100 hover:text-green-500 md:flex-none md:justify-start md:p-2 md:px-3">
            <Power className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}

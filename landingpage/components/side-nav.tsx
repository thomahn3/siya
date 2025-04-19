import Link from 'next/link';
import Logo from '@/components/ui/logo';
import { userRedirect } from '@/lib/actions';
import { Session } from 'next-auth';
import NavLinks, { SignOut } from '@/components/ui/nav-links';


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
        <NavLinks userType={userType} session={session} />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
          <SignOut />
      </div>
    </div>
  );
}

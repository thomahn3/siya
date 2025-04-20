import Link from 'next/link';
import Logo from '@/components/ui/logo';
import { userRedirect } from '@/lib/actions';
import { Session } from 'next-auth';
import NavLinks from '@/components/ui/nav-links';


export default async function SideNav({ session }: { session: Session | null }) {
    
    const userType = await userRedirect({ session }, true) as string
  
    return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gray-50 md:border-r md:border-t-[0px] border-gray-200 border-t shadow-lg">
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
      </div>
    </div>
  );
}

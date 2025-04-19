import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { SignOut } from '@/components/sign-out';
import { checkProfileSetup, userRedirect } from '@/lib/actions';


const Page = async () => {

    const session = await auth();
    let useType = session ? await userRedirect({ session }, true) : null;
    if (!session) {
        redirect('/sign-in')
    }
    if (session && useType != "request") {
        redirect("/dashboard-contractor");
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center py-2">
        <h1 className="text-4xl font-bold">Dashboard - Customer</h1>
        <p className="mt-4 text-lg">This is the dashboard page.</p>
        <p className="mt-4 text-lg">Your Email: {session.user?.email}</p>
        <SignOut />
        </div>
    );
}

export default Page;
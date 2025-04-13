import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { SignOut } from '@/components/sign-out';
import { checkProfileSetup } from '@/lib/actions';


const Page = async () => {

    const session = await auth();
    if (!session) {
        redirect('/sign-in')
    } else if (session && !(await checkProfileSetup(session.user?.id))) {
        redirect("/profile-setup")
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center py-2">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="mt-4 text-lg">This is the dashboard page.</p>
        <p className="mt-4 text-lg">Your Email: {session.user?.email}</p>
        <SignOut />
        </div>
    );
}

export default Page;
import ProfileCard from "@/components/profile/profile-card";
import { userRedirect } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { getUserData } from "@/lib/data";
import { redirect } from "next/navigation";
import { userDataSchema } from "@/lib/schema";
import { SignOut } from "@/components/auth/sign-out";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default async function Page({ params }: { params: Promise<{ userid: string }> }) {
    const session = await auth();
    const userId = (await params).userid;
    const rawData = await getUserData(session);

    if (session?.user?.id !== userId) {
        redirect("/sign-in");
    }

    const data = userDataSchema.parse(rawData);

    return (
        <div className="flex-col justify-center items-center">
            <ProfileCard session={session} data={data} />        
        </div>
    );
}
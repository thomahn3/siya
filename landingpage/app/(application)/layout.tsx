import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from '@/components/ui/header'
import SideNav from "@/components/side-nav";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIYA",
  description: "Services In Your Area",
};

export default async function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    redirect('/sign-in')
  }

  return (
  <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    <div className="w-full flex-none md:w-64 order-last md:order-first sticky bottom-0 md:static">
      <SideNav session={session}/>
    </div>
    <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
      {children}
    </div>
  </div>
  );
}
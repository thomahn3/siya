import SubscribeForm from "@/components/email-form";
import Header from "@/components/ui/header";
import { Waypoints } from 'lucide-react';
import { UserRoundSearch } from 'lucide-react';
import { CalendarDays } from 'lucide-react';
import { UsersRound } from 'lucide-react';
import { CalendarSync } from 'lucide-react';
import { HandCoins } from 'lucide-react';
import { motion } from "motion/react"
import { Button } from "@/components/ui/button";
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth'
import { checkProfileSetup, userRedirect } from "@/lib/actions";
import FadeInLeft from "@/components/fade-in-left";



export default async function Home() {

  const session = await auth();
  let url = session ? await userRedirect({ session }) : null;

  if (session && url) {
    redirect(url);
  }


  return (
    <main className="overflow-x-hidden">

      <Header>
        <div className="ml-auto flex items-center space-x-4">
          <Button asChild variant="headerLink">
            <Link href='mailto:SIYAinquiries@gmail.com'>Contact</Link>
          </Button>
          <div className='space-x-2'>
            <Button asChild variant="default" className='rounded-full'>
                <Link href='/sign-in'>Sign In</Link>
            </Button>
            <Button asChild variant="default" className='rounded-full'>
                <Link href='/sign-up'>Sign Up</Link>
            </Button>
          </div>
        </div>
      </Header>

      <section className="py-10 lg:py-20">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col lg:flex-row items-center w-full">
        <div className="p-6 lg:w-1/2 order-last lg:order-first">
          <div className="justify-center items-center xl:ml-40">
          <div className="font-bold text-2xl lg:text-4xl">
          <p>
            Easily find and connect to <br /> <span className="text-green-500">Services In Your Area.</span>
          </p>
          </div>
          <p className="mt-4 text-lg text-slate-500">
            Connecting customers to service-based businesses in the local area.
          </p>
          <div className="mt-6">
            <SubscribeForm />
          </div>
          </div>
        </div>
        <div className="p-6 lg:w-1/2 flex justify-center items-center">
          <img src="/painter_decorating.svg" alt="painter decorating" className="w-5/8"/>
        </div>
        </div>
      </div>
      </section>

      <section className="py-10 lg:py-20 border-t border-gray-200">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col lg:flex-row items-center w-full">
        <div className="p-6 lg:w-1/2">
          <div className="ml-5 mr-5 lg:ml-20 lg:mr-30">
          <p className="text-green-500">Customer Convenience</p>
          <p className="text-xl font-bold mt-2">Make Searching Effortless</p>
          <p className="mt-4 text-slate-500">
            Tired of searching for different businesses to perform a job for you, only to endure the inconvenience of comparing quotes and being uncertain of their reliability?
          </p>
          <div className="mt-6 space-y-6 flex flex-col">
            <FadeInLeft delay={0}>
              <Waypoints size={24} strokeWidth={2} className="mr-4 flex-none place-self-center" />
              <p className="text-slate-500">
                We facilitate the seamless connection between customers and businesses, offering a swift and effortless solution to the complexities of finding services.
              </p>
            </FadeInLeft>
            <FadeInLeft delay={0.2}>
              <UserRoundSearch size={24} strokeWidth={2} className="mr-4 flex-none place-self-center" />
              <p className="text-slate-500">
                Access local experts within your vicinity, supporting local businesses whilst ensuring the quality of the service is exceptional.
              </p>
            </FadeInLeft>
            <FadeInLeft delay={0.4}>
              <CalendarDays size={24} strokeWidth={2} className="mr-4 flex-none place-self-center" />
              <p className="text-slate-500">
                Customers can conveniently book and schedule services directly through the application, offering options to select preferred times and dates; enhancing customer convenience.
              </p>
            </FadeInLeft>
          </div>
          </div>
        </div>
        <div className="p-6 lg:w-1/2 flex justify-center items-center">
        <img src="/person_on_the_couch_with_laptop.svg" alt="Person on the couch with laptop illustration" className="w-3/4"/>
        </div>
        </div>
      </div>
      </section>

      <section className="py-10 lg:py-20 border-t border-gray-200">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col lg:flex-row items-center w-full">
        <div className="p-6 lg:w-1/2 flex justify-center items-center order-last lg:order-first">
          <img src="/person_holding_phone.svg" alt="painter decorating" className="w-3/4"/>
        </div>
        <div className="p-6 lg:w-1/2">
          <div className="ml-5 mr-5 lg:ml-20 lg:mr-20">
          <p className="text-green-500">Business Reach</p>
          <p className="text-xl font-bold mt-2">Increase Discoverability</p>
          <p className="mt-4 text-slate-500">
            Struggling to fill your schedule with reliable clients? Tired of wasting hours on marketing, quoting, and chasing leads? Want to connect directly to customers in your area who need your skills, no cold calls, no ads, just jobs tailored to your expertise?
          </p>
          <div className="mt-6 space-y-6">
            <FadeInLeft delay={0}>
              <UsersRound size={24} strokeWidth={2} className="mr-4 flex-none place-self-center" />
              <p className="text-slate-500">
                Service providers gain access to a large pool of potential customers within their local vicinity, facilitating businesses in attracting new clients without the necessity of extensive advertising campaigns.
              </p>
            </FadeInLeft>
            <FadeInLeft delay={0.2}>
              <CalendarSync size={24} strokeWidth={2} className="mr-4 flex-none place-self-center" />
              <p className="text-slate-500">
                The application automates the customer connection process, thereby reducing the time and budget allocated to marketing, quotation, and scheduling; enabling businesses to focus on delivering their services rather than managing leads.
              </p>
            </FadeInLeft>
            <FadeInLeft delay={0.4}>
              <HandCoins size={24} strokeWidth={2} className="mr-4 flex-none place-self-center" />
              <p className="text-slate-500">
                Service providers have the opportunity to accept additional work commitments during evenings, weekends, or public holidays, thereby enhancing their earning potential and offering flexibility.
              </p>
            </FadeInLeft>
          </div>
          </div>
        </div>
        </div>
      </div>
      </section>

      <section className="py-10 lg:py-20 border-t border-gray-200">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex flex-col lg:flex-row w-full">
            <div className="p-6 lg:w-1/2 order-last lg:order-first">
              <div className="ml-5 mr-5 lg:ml-20 lg:mr-20">
                <p className="text-xl font-bold mt-2">Have Any Further Questions?</p>
                <p>Contact us at <a href="mailto:SIYAinquiries@gmail.com" className="underline text-green-500">SIYAinquiries@gmail.com</a>.</p>
                <p>Our team will get back to you as soon as possible.</p>
              </div>
            </div>
            <div className="p-6 lg:w-1/2 justify-center items-center lg:justify-none lg:items-none">
              <div className="ml-5 mr-5 lg:ml-20 lg:mr-20">
                <p className="text-green-500">Stay Updated</p>
                <p className="text-xl font-bold mt-2">Join Our Waiting List</p>
                <p className="mt-4 text-slate-500">
                  Be the first to know when we launch the application. Join our waiting list to receive updates on the develepoment of <span className="text-green-500">SIYA</span>.
                </p>
                <div className="mt-2">
                  <SubscribeForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

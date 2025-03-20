import SubscribeForm from "./ui/emailForm";
import Header from "./ui/header";
import { Waypoints } from 'lucide-react';
import { UserRoundSearch } from 'lucide-react';
import { CalendarDays } from 'lucide-react';
import { UsersRound } from 'lucide-react';
import { CalendarSync } from 'lucide-react';
import { HandCoins } from 'lucide-react';

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <section className="h-[50vh] py-20">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col md:flex-row items-center w-full">
        <div className="p-6 md:w-1/2">
          <div className="ml-40">
          <p className="font-bold text-2xl md:text-4xl">
            Easily find and connect to <br />
            <span className="text-green-500">Services In Your Area.</span>
          </p>
          <p className="mt-4 text-lg text-slate-500">
            Connecting customers to service-based businesses <br/> in the local area.
          </p>
          <div className="mt-6">
            <SubscribeForm />
          </div>
          </div>
        </div>
        <div className="p-6 md:w-1/2">
          {/* Add content or image here */}
        </div>
        </div>
      </div>
      </section>

      <section className="py-20 bg-gray-50">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col md:flex-row items-center w-full">
        <div className="p-6 md:w-1/2">
          <div className="ml-60 mr-30"> {/* Make this dynamic for different screen sizes */}
          <p className="text-green-500">Customer Convenience</p>
          <p className="text-xl font-bold mt-2">Make Searching Effortless</p>
          <p className="mt-4 text-slate-500">
            Tired of searching for different businesses to perform a job for you, only to endure the inconvenience of comparing quotes and at this point, you are uncertain of their reliability?
          </p>
          <div className="mt-6 space-y-6 flex flex-col">
            <div className="flex flex-row items-start">
            <Waypoints size={24} strokeWidth={2} className="mr-4 flex-none mt-[10px]" />
            <p className="text-slate-500">
              We facilitate the seamless connection between customers and businesses, offering a swift and effortless solution to the complexities of personally finding services.
            </p>
            </div>
            <div className="flex flex-row items-start">
            <UserRoundSearch size={24} strokeWidth={2} className="mr-4 flex-none mt-[10px]" />
            <p className="text-slate-500">
              Access local experts within your vicinity, supporting local businesses while ensuring that the quality of the service you require is exceptional.
            </p>
            </div>
            <div className="flex flex-row items-start">
            <CalendarDays size={24} strokeWidth={2} className="mr-4 flex-none mt-[10px]" />
            <p className="text-slate-500">
              Customers can conveniently book and schedule services directly through the application, offering options to select preferred times and dates, enhancing customer convenience.
            </p>
            </div>
          </div>
          </div>
        </div>
        <div className="p-6 md:w-1/2">
          {/* Add content or image here */}
        </div>
        </div>
      </div>
      </section>

      <section className="py-20">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col md:flex-row items-center w-full">
        <div className="p-6 md:w-1/2">
          {/* Add content or image here */}
        </div>
        <div className="p-6 md:w-1/2">
          <div className="ml-30 mr-60">
          <p className="text-green-500">Business Reach</p>
          <p className="text-xl font-bold mt-2">Increase Discoverability</p>
          <p className="mt-4 text-slate-500">
            Tired of searching for different businesses to perform a job for you, only to endure the inconvenience of comparing quotes and at this point, you are uncertain of their reliability?
          </p>
          <div className="mt-6 space-y-6">
            <div className="flex flex-row items-start">
            <UsersRound size={24} strokeWidth={2} className="mr-4 flex-none mt-[10px]" />
            <p className="text-slate-500">
              Service providers gain access to a large pool of potential customers within their local vicinity, facilitating businesses in attracting new clients without the necessity of extensive advertising campaigns.
            </p>
            </div>
            <div className="flex flex-row items-start">
            <CalendarSync size={24} strokeWidth={2} className="mr-4 flex-none mt-[10px]" />
            <p className="text-slate-500">
              The application automates the customer connection process, thereby reducing the time and effort allocated to marketing, quotation, and scheduling, enabling businesses to focus on delivering their services rather than managing leads.
            </p>
            </div>
            <div className="flex flex-row items-start">
            <HandCoins size={24} strokeWidth={2} className="mr-4 flex-none mt-[10px]" />
            <p className="text-slate-500">
              Service providers have the opportunity to accept additional work commitments during evenings, weekends, or public holidays, thereby enhancing their earning potential and offering flexablity.
            </p>
            </div>
          </div>
          </div>
        </div>
        </div>
      </div>
      </section>
    </main>
  );
}

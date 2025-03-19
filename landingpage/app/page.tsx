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
      <Header/>
      <section className="h-[60vh]">
          <div className="absolute flex flex-col justify-center items-center h-[60vh] w-full overflow-hidden">
            <div className="justify-center w-full h-full flex flex-row items-center">
              <div className="border w-1/2 h-full">
                <div className=" ml-10 relative inset-y-40">
                    <p className="font-bold text-[40px]">Easily find and connect to <br/><span className="text-[40px] text-green-500">Services In Your Area.</span></p>
                    <p className="mr-70 text-[20px] text-slate-500">Connecting customers to service based businesses in the local area.</p>
                    <SubscribeForm/>
                </div>
              </div>
              <div className="border h-full w-1/2">
                <p></p>
              </div>
            </div>
          </div>
      </section>

      <section className="h-[80vh]">
          <div className="absolute flex flex-col justify-center items-center h-[80vh] w-full overflow-hidden">
            <div className="justify-center w-full h-full flex flex-row items-center">
              <div className="border w-1/2 h-full">
                <div className="relative ml-60 inset-y-30">
                  <p className="text-green-500">Customer Convenience</p>
                  <p className="text-[20px] font-bold">Make Searching Effortless</p>
                  <p className="text-slate-500 pt-6 mr-50">Tired of searching for different businesses to perform a job for you, only to endure the inconvenience of comparing quotes and at this point, you are uncertain of their reliability?</p>
                  
                  <div className="relative flex flex-col">
                    <div className="realative flex flex-row mb-4 mt-8">
                      <div className="ml-10 mr-4">
                        <Waypoints size={32} strokeWidth={2}/>
                      </div>
                      <div>
                        <p className="text-slate-500 mr-50">We facilitate the seamless connection between customers and businesses, offering a swift and effortless solution to the complexities of personally finding services.</p>
                      </div>
                    </div>

                    <div className="realative flex flex-row mb-4 mt-4">
                      <div className="ml-10 mr-4">
                        <UserRoundSearch size={32} strokeWidth={2}/>
                      </div>
                      <div>
                        <p className="text-slate-500 mr-50">Access local experts within your vicinity, supporting local businesses while ensuring that the quality of the service you require is exceptional.</p>
                      </div>
                    </div>

                    <div className="realative flex flex-row mb-4 mt-4">
                      <div className="ml-10 mr-4">
                        <CalendarDays size={32} strokeWidth={2}/>
                      </div>
                      <div>
                        <p className="text-slate-500 mr-50">Customers can conveniently book and schedule services directly through the application, offering options to select preferred times and dates, enhancing customer convenience.</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="border h-full w-1/2">
                <p></p>
              </div>
            </div>
          </div>
      </section>

      <section className="h-screen">
          <div className="absolute flex flex-col justify-center items-center h-screen w-full overflow-hidden">
            <div className="justify-center w-full h-full flex flex-row items-center">
              <div className="border h-full w-1/2">
                <p></p>
              </div>
              <div className="border w-1/2 h-full">
                <div className="relative ml-60 inset-y-30">
                  <p className="text-green-500">Business Reach</p>
                  <p className="text-[20px] font-bold">Increase Discoverability</p>
                  <p className="text-slate-500 pt-6 mr-50">Tired of searching for different businesses to perform a job for you, only to endure the inconvenience of comparing quotes and at this point, you are uncertain of their reliability?</p>
                  
                  <div className="relative flex flex-col">
                    <div className="realative flex flex-row mb-4 mt-8">
                      <div className="ml-10 mr-4">
                        <UsersRound size={32} strokeWidth={2}/>
                      </div>
                      <div>
                        <p className="text-slate-500 mr-50">Service providers gain access to a large pool of potential customers within their local vicinity. The application functions as a marketing instrument, facilitating businesses in attracting new clients without the necessity of extensive advertising campaigns.</p>
                      </div>
                    </div>

                    <div className="realative flex flex-row mb-4 mt-4">
                      <div className="ml-10 mr-4">
                        <CalendarSync size={32} strokeWidth={2}/>
                      </div>
                      <div>
                        <p className="text-slate-500 mr-50">The application automates the customer connection process, thereby reducing the time and effort allocated to marketing, quotation, and scheduling. This enables businesses to concentrate their efforts on delivering their services rather than managing leads.
                        </p>
                      </div>
                    </div>

                    <div className="realative flex flex-row mb-4 mt-4">
                      <div className="ml-10 mr-4">
                        <HandCoins size={32} strokeWidth={2}/>
                      </div>
                      <div>
                        <p className="text-slate-500 mr-50">Service providers have the opportunity to accept additional work commitments during evenings, weekends, or public holidays, thereby enhancing their earning potential. The application facilitates their seamless identification of short-term or one-off jobs offering flexibility in managing their work schedule.</p>
                      </div>
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

import SubscribeForm from "./ui/emailForm";
import Header from "./ui/header";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Header/>
      <section className="h-dvh">
        <div>
          <div className="absolute flex flex-col justify-center items-center h-screen w-full overflow-hidden">
            <div className="absolute justify-center w-full">
              <div className="mt-6">
                <SubscribeForm/> 
              </div>
            </div>
            <div className="absolute bottom-0 text-white">
              <p>Not sure yet?</p>
            </div>
          </div>
        </div>
      </section>
      <section className="h-dvh border-2">
        <div className="absolute flex flex-col justify-center items-center h-dvh w-full overflow-hidden">
          <div className="absolute justify-center w-full">
            
          </div>
        </div>
      </section>
      <section className="h-dvh border-2">
        <div className="absolute flex flex-col justify-center items-center h-dvh w-full overflow-hidden">
          <div className="absolute justify-center w-full">

          </div>
        </div>
      </section>
    </main>
  );
}

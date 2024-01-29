import Image from "next/image";
import Hoome from '../app/home/page'
import One from '../components/one'
import Two from '../components/two'

export default function Home() {
  return (

    <>
    <section className="bg-white relative flex items-center justify-center">
      <div className="relative items-center w-full px-5 py-12 mx-auto max-w-7xl lg:px-16 lg:py-32 md:px-12">
        <div>
          <div className="relative text-center">
            <p className="mt-8 text-3xl font-extrabold tracking-tighter text-black md:text-6xl">


              Welcome to [Your App Name] - <span className="md:block"> Your Compassionate Space for Personal Growth</span>
            </p>
            <p className="max-w-xl mx-auto mt-4 text-xl text-slate-600">
              Are you navigating the complexities of life and seeking guidance on your journey? Look no further! [Your App Name] is your trusted online platform for personalized guidance and counseling.
            </p>
            {/* <div className="mt-6">
            Try it here and now: Hold &nbsp;
            <span className="px-4 py-2 font-mono border rounded-full">⌥ Option</span>
            &nbsp; and move with the cursor around this page.
          </div> */}
          </div>
        </div>
        <div className="relative items-center w-full py-12 pb-12 mx-auto mt-12 max-w-7xl">
          <svg fill="none" viewBox="0 0 400 400" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" className="absolute -mt-24 blur-3xl">
            {/* SVG content */}
          </svg>
          <video className="relative object-cover w-full rounded shadow-2xl lg:rounded-2xl" controls muted>
            <source src="https://d33wubrfki0l68.cloudfront.net/b3fb0d3c87038c6a1517d3220eedee8bead88964/419d0/monoqrom.mp4" />
          </video>
        </div>
      </div>
    </section>
    <One />
    <Two />
    </>

  );
}

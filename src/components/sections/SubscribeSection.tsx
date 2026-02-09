
import { Button } from '../ui/button';
import {lato, poppins} from '@/app/layout'

export default function AIHeroSubscribe() {
  return (
    <section className="w-full bg-[#3F4BC8] py-30 flex items-center justify-center">
      <div className="md:max-w-4xl w-full px-4 md:px-6 text-center flex flex-col items-center gap-6">
        {/* Headline */}
        <h1 className={`${poppins.className} text-white font-bold text-3xl md:text-[40px] leading-tight`}>
          AI is the new Electricity.
          <br />
          You are the Spark.
        </h1>

        {/* Subtext */}
        <p className="text-white text-lg md:text-lg w-full md:max-w-xl">
          Get the latest AI news, courses, events, and insights from Andrew Ng
          and other AI leaders.
        </p>

        {/* Input + Button */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-2 w-full md:w-[auto]">
          <input
            type="email"
            placeholder="username@gmail.com"
            className="h-[55px] w-full md:w-[220px] md:w-[300px] px-4 rounded-md outline-none bg-white border border-blue-800  text-sm"
          />

          <Button
            type="button"
            variant='subscribe'
            className=" hover:opacity-90 transition"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}

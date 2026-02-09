import { HeroProps } from '@/types/ui';
import { Button } from '@/components/ui/button';
import HeroImage from '@/app/assets/images/hero-image.png'
import ArrowRight from '@/app/assets/icons/arrow-right.svg'
import Image from 'next/image';

import {lato, poppins} from "@/app/layout";


export default function Hero({ 

  title = "Discover AI with us, bring out the inner passion.", 
  description = "Grow your AI career with foundational specializations and skill-specific short courses taught by leaders in the field.", 
  ctaPrimary = { text: "Enroll Now", href: "/register" },
  ctaSecondary = { text: "Explore", href: "/courses" },
  review = {stars: 4, reviews: "4.7"}
  


}: HeroProps) {

    const MAX_STARS = 5


  return (
    <section className="relative py-16  md:py-24 md:pt-10 bg-gradient-to-br from-gray-20 to-gray-10">
     
        <div className="w-[90%] md:w-[80%]  mx-auto flex items-center justify-between text-center gap-[4rem]">
          
          <div className='w-full md:w-[65%] text-left  flex flex-col'>
                <button className='mb-4 w-[14rem] h-[3rem] rounded-full font-bold border border-gray-400 bg-gray-200 flex items-center justify-center p-1 px-4 gap-[2] '>
                    {Array.from({ length: MAX_STARS }).map((_, index) => (
                        <span key={index} className='text-amber-500  text-lg '>
                        {index < review.stars ? "★" : "☆"}
                        </span>
                    ))}
                    <p className={`${lato.className} ml-2`}>
                        <span className='mr-1'>{review.reviews}</span> 
                        <span>Reviews</span>
                    </p>
                </button>
                <h1 className={`${lato.className} text-4xl md:text-5xl lg:text-[3.5rem] gradient-text font-bold mb-6 md:mb-8`}>
                {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button  variant="cta" className='w-full md:w-[15rem] text-white text-center border border-3 border-blue-500 text-[20px] font-bold flex items-center justify-between rounded-[15px] p-2 pl-6' href={ctaPrimary.href}>
                    {ctaPrimary.text}
                    <div className='w-[3rem] h-[3rem] flex items-center justify-center bg-white rounded-[10px] '>
                        <Image src={ArrowRight} width={40} height={40} className='w-[1.8rem]' alt='arrow right' />
                    </div>
                </Button>
                <Button variant="secondary" size="lg" href={ctaSecondary.href}>
                {ctaSecondary.text}
                </Button>
            </div>
          </div>

          <div className='hidden md:flex  min-w-[35%]'>
            <Image width={400} height={200} src={HeroImage} className='w-full' alt='hero image'/>
          </div>



        </div>

         <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/3 right-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

    </section>
  );
}
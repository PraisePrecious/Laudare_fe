// 'use client'

// import React, {useState} from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
import Hero from '@/components/sections/Hero';
import AIHeroSubscribe from '@/components/sections/SubscribeSection';
import CoursesCarousel from '@/components/sections/CoursesSection';
const Home = () => {
  
  return (
    <>
      <section className='w-full'>
      
        <Hero />
      </section>

      <AIHeroSubscribe />

      <div className='w-full bg-white h-[10rem] flex justify-center items-center'>
        <h2 className='text-2xl md:text-4xl text-gray-700 font-bold text-center'>
          Join over 7 million people learning how to use and build AI
        </h2>
      </div>

      <CoursesCarousel />
    


     


     





    </>
  );
};

export default Home;

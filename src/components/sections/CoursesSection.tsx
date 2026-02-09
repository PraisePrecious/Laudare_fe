// src/components/sections/CoursesCarousel.tsx
"use client";

import { useEffect, useRef, useState } from "react";
// import { courses } from "@/data/courses";
import CourseCard from "../ui/carousels/CarouselCard";
import { CarouselControls } from "../ui/carousels/CarouselControls";
import { CarouselDots } from "../ui/carousels/CarouselDots";

import { api } from "@/lib/api";
import { CourseCatalog } from "@/lib/types";
import { error } from "console";

const CARD_WIDTH = 280;

export default function CoursesCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [courses, setCourses] = useState<CourseCatalog[]>([])
  const [loading, setLoading] = useState(false)



  useEffect(() => {
    getCourses()
  })

  const getCourses = async () => {
    try {
      setLoading(true)
      const [courseRes] = await Promise.all([api.getCourseCatalog(),]);
      
      const allCourses = courseRes.data
      setCourses(allCourses)

    }catch (error) {
      console.error("failed to load courses")
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    const updateCardsPerView = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const visibleCards = Math.floor(containerWidth / CARD_WIDTH);

      setCardsPerView(Math.max(1, visibleCards));
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);

    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);


  const totalDots = Math.ceil(courses.length / cardsPerView);


  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const scrollAmount = CARD_WIDTH * cardsPerView;

    setActiveIndex((prev) => {
      const nextIndex =
        direction === "left"
          ? Math.max(prev - 1, 0)
          : Math.min(prev + 1, totalDots - 1);

      containerRef.current!.scrollTo({
        left: nextIndex * scrollAmount,
        behavior: "smooth",
      });

      return nextIndex;
    });
  };

  return (
    <section className="relative bg-gradient-to-b from-blue-800 to-blue-900 py-20 text-white">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 space-y-4 text-center">
        <h1 className="font-bold text-3xl md:text-[40px] leading-tight">
          AI Courses and Specialization.
        </h1>

        <p className="text-lg">
          Build a foundation of machine learning and AI skills, and
          understand how to apply them in the real world.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative mt-14">
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto md:px-24 px-8 scroll-smooth"
        >
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        <CarouselControls
          onPrev={() => scroll("left")}
          onNext={() => scroll("right")}
        />
      </div>

      {/* Dots */}
      <CarouselDots
        total={totalDots}
        active={activeIndex}
      />

      {/* CTA */}
      <div className="mt-10 text-center">
        <button className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700">
          Expand all courses
        </button>
      </div>
    </section>
  );
}

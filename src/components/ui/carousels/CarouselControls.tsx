// src/components/ui/CarouselControls.tsx

import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

type Props = {
  onPrev: () => void;
  onNext: () => void;
};

export function CarouselControls({ onPrev, onNext }: Props) {
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white text-black shadow flex items-center justify-center"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white text-black shadow flex items-center justify-center"
      >
        <FaChevronRight />
      </button>
    </>
  );
}

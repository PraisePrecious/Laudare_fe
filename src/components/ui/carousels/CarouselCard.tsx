// src/components/cards/CourseCard.tsx
import Image from "next/image";

type Props = {
  title: string;
  category: string;
  thumbnail: string;
};

export default function CourseCard({ title, category, thumbnail }: Props) {
  return (
    <div className="min-w-[260px] max-w-[260px] rounded-xl bg-white shadow-md overflow-hidden">
      <img
        src={thumbnail || "/images/hero-image.png"}
        alt={title}
        width={320}
        height={200}
        className="h-[160px] w-full object-cover"
      />

      <div className="p-4 space-y-2">
        <span className="inline-block rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
          {category}
        </span>

        <p className="text-sm font-semibold text-gray-900 leading-snug">
          {title}
        </p>
      </div>
    </div>
  );
}

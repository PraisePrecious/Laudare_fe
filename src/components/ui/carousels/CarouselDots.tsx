// src/components/ui/CarouselDots.tsx
type Props = {
  total: number;
  active: number;
};

export function CarouselDots({ total, active }: Props) {
  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={`h-2 w-2 rounded-full ${
            index === active ? "bg-yellow-400" : "bg-white/50"
          }`}
        />
      ))}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
};

export default function ProductCarousel({ images }: Props) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Image
        src={images[activeImageIndex]}
        alt="Image of supplier's stone"
        width={600}
        height={600}
        quality={100}
        className="w-full rounded-md object-cover"
      />
      <div className="flex items-center justify-center gap-4">
        {images.map((i, index) => (
          <div
            key={index}
            className={`cursor-pointer border-2 p-[2px] ${index == activeImageIndex ? "rounded-md border-secondary opacity-100" : "border-primary opacity-70"}`}
            onClick={() => setActiveImageIndex(index)}
          >
            <Image
              src={i}
              alt="Image of supplier's stone"
              height={60}
              width={90}
              className="rounded-md object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

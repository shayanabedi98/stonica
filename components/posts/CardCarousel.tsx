"use client";

import Image from "next/image";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function CardCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative flex h-60 w-full items-center justify-between">
      <button
        className={`absolute -left-3 z-10 text-4xl ${images.length > 1 ? "flex" : "hidden"}`}
        onClick={handlePrevious}
      >
        <FaArrowLeft className="rounded-full bg-primary bg-opacity-80 p-2 text-secondary transition lg:hover:scale-105 lg:hover:bg-opacity-100" />
      </button>
      <div className="flex items-center justify-center">
        {images.length > 0 ? (
          images.map((src, index) => (
            <div key={index} className={`absolute inset-0 h-full w-full`}>
              <Image
                src={src}
                alt=""
                height={400}
                width={400}
                quality={100}
                priority
                className={`h-full w-full rounded-md object-cover transition duration-500 ${index == currentIndex ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          ))
        ) : (
          <div className={`absolute inset-0 h-full w-full`}>
            <Image
              src={"/assets/default.jpg"}
              alt=""
              height={400}
              width={400}
              quality={100}
              priority
              className={`duration-500opacity-100 h-full w-full rounded-md object-cover transition`}
            />
          </div>
        )}
      </div>
      <button
        className={`absolute -right-3 z-10 text-4xl ${images.length > 1 ? "flex" : "hidden"}`}
        onClick={handleNext}
      >
        <FaArrowLeft className="rotate-180 rounded-full bg-primary bg-opacity-80 p-2 text-secondary transition lg:hover:scale-105 lg:hover:bg-opacity-100" />
      </button>
    </div>
  );
}

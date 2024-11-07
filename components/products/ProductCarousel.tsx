"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { HiArrowSmallRight } from "react-icons/hi2";

type Props = {
  images: string[];
};

export default function ProductCarousel({ images }: Props) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (showImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showImage]);

  const handlePrevImage = () => {
    if (activeImageIndex == 0) {
      setActiveImageIndex(images.length - 1);
    } else {
      setActiveImageIndex((prev) => prev - 1);
    }
  };

  const handleNextImage = () => {
    if (activeImageIndex == images.length - 1) {
      setActiveImageIndex(0);
    } else {
      setActiveImageIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="flex select-none flex-col items-center justify-center gap-2">
      {showImage && (
        <div className="fixed left-0 top-0 z-30 flex h-full w-full items-center justify-center bg-black bg-opacity-95 text-primary">
          <Image
            src={images[activeImageIndex]}
            alt="Image of supplier's stone"
            width={1100}
            height={1100}
            className="h-[80%] max-w-[80%] object-contain"
            quality={100}
            onLoad={() => setIsLoading(false)}
          />
          <div className="text-4xl">
            <HiArrowSmallLeft
              className="absolute left-10 cursor-pointer rounded-full p-1 transition lg:hover:bg-neutral-800"
              onClick={handlePrevImage}
            />
            <HiArrowSmallRight
              className="absolute right-10 cursor-pointer rounded-full p-1 transition lg:hover:bg-neutral-800"
              onClick={handleNextImage}
            />
          </div>
          <span className="absolute bottom-12 rounded-md bg-neutral-800 px-2 py-1">
            {activeImageIndex + 1}/{images.length}
          </span>
          {isLoading && (
            <div className="absolute z-20 flex items-center justify-center">
              <AiOutlineLoading3Quarters className="loading text-3xl text-primary" />
            </div>
          )}
          <IoMdClose
            className="absolute right-10 top-10 cursor-pointer rounded-full p-1 text-5xl text-primary transition lg:hover:bg-neutral-800"
            onClick={() => setShowImage(false)}
          />
        </div>
      )}
      <div className="relative flex w-full items-center justify-center">
        <Image
          src={images[activeImageIndex]}
          alt="Image of supplier's stone"
          width={600}
          height={600}
          quality={100}
          className="w-full cursor-pointer rounded-md object-cover"
          onClick={() => {
            setShowImage(true);
          }}
          onLoad={() => setIsLoading(false)}
        />
        {isLoading && (
          <div className="absolute z-20 flex items-center justify-center">
            <AiOutlineLoading3Quarters className="loading text-3xl text-primary" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-4">
        {images.map((i, index) => (
          <div
            key={index}
            className={`cursor-pointer border-2 p-[2px] ${index == activeImageIndex ? "rounded-md border-secondary opacity-100" : "border-primary opacity-70"}`}
            onClick={() => {
              setActiveImageIndex(index);
              setIsLoading(index == activeImageIndex ? false : true);
            }}
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

"use client";

import { Product, User } from "@/types";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

export default function CardCarousel({
  images,
  signedInUser,
  formData,
}: {
  images: string[];
  signedInUser?: User;
  formData?: Product;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const path = usePathname();

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleWishlist = async (id: string | undefined) => {
    if (signedInUser) {
      try {
        const res = await fetch("/api/post/wishlist", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ id }),
        });
        const data = await res.json();
        if (res.ok) {
          toast.success(data.message);
          router.refresh();
        }
      } catch (error) {
        toast.error("Something went wrong, try again later");
      }
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className="relative flex h-96 w-96 items-center justify-between">
      {path.includes("/vendor") === false && (
        <div
          className="absolute bottom-4 right-4 z-20 flex cursor-pointer items-center justify-center rounded-full bg-color1 p-[11px] text-2xl text-primary"
          onClick={() => handleWishlist(formData?.id)}
        >
          {signedInUser?.wishlist?.includes(formData?.id as string) ? (
            <IoBookmark className="wishlist" />
          ) : (
            <IoBookmarkOutline className="wishlist" />
          )}
        </div>
      )}
      <button
        className={`absolute left-1 z-10 text-4xl ${images.length > 1 ? "flex" : "hidden"}`}
        onClick={handlePrevious}
      >
        <IoIosArrowBack className="rounded-full bg-primary bg-opacity-80 p-1 text-secondary transition lg:hover:scale-105 lg:hover:bg-opacity-100" />
      </button>
      <div className="flex items-center justify-center">
        {images.length > 0 ? (
          images.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 aspect-square h-full w-full`}
            >
              <Image
                src={src}
                alt=""
                height={400}
                width={400}
                quality={100}
                priority
                className={`h-full w-full rounded-t-md object-cover transition duration-500 ${index == currentIndex ? "opacity-100" : "opacity-0"}`}
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
              className={`h-full w-full border-2 object-cover opacity-100 transition duration-500`}
            />
          </div>
        )}
      </div>
      <button
        className={`absolute right-1 z-10 text-4xl ${images.length > 1 ? "flex" : "hidden"}`}
        onClick={handleNext}
      >
        <IoIosArrowForward className="rounded-full bg-primary bg-opacity-80 p-1 text-secondary transition lg:hover:scale-105 lg:hover:bg-opacity-100" />
      </button>
    </div>
  );
}

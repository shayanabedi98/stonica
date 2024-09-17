"use client";

import CardCarousel from "./CardCarousel";
import { IoIosPricetag } from "react-icons/io";
import { FaBox } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import { GiStoneTablet } from "react-icons/gi";
import Link from "next/link";
import Btn from "../Btn";
import Image from "next/image";

type Props = {
  price: number;
  qty: number;
  title: string;
  type: string;
  color: string;
  images: string[];
  tel: string;
  href?: string;
  logo?: string;
  companyName: string;
};

export default function Card({
  price,
  images,
  qty,
  title,
  type,
  color,
  tel,
  href,
  logo,
  companyName,
}: Props) {
  let colorCode = ""; // default color

  switch (color) {
    case "Black":
      colorCode = "bg-black";
      break;
    case "Red":
      colorCode = "bg-red-500";
      break;
    case "Yellow":
      colorCode = "bg-yellow-500";
      break;
    case "Green":
      colorCode = "bg-green-500";
      break;
    case "White":
      colorCode = "bg-white";
      break;
    default:
      colorCode = "bg-black"; // fallback color
  }
  return (
    <div className="flex min-h-[500px] w-[400px] flex-col items-center gap-4 rounded-md bg-gradient-to-b from-secondary to-neutral-200 px-6 py-6 text-primary shadow-lg">
      <div className="flex w-full flex-col gap-4 self-start">
        <div>
          <p className="text-xl font-bold">{title}</p>
          <div className="flex items-center gap-2">
            <Image
              src={logo || "/assets/avatar.png"}
              alt={`${companyName} logo`}
              height={26}
              width={26}
              className="h-6 w-6 rounded-full border-2 border-primary bg-white object-cover"
            />
            <p className="">{companyName}</p>
          </div>
        </div>
        <hr className="w-full" />
        <div>
          <p className="font-bold">{type}</p>
          <p className="flex items-center gap-2">
            <span
              className={`h-6 w-6 ${colorCode} rounded-full border-2 border-primary`}
            ></span>
            {color}
          </p>
        </div>
      </div>
      <CardCarousel images={images} />
      <div className="flex w-full flex-col gap-4 text-sm">
        <div className="flex justify-between">
          <p className="flex items-center gap-2 font-semibold">
            <IoIosPricetag className="text-xl" />
            Price
          </p>
          <p>${price} CAD</p>
        </div>
        <div className="flex justify-between">
          <p className="flex items-center gap-2 font-semibold">
            <FaBox className="text-xl" />
            Quantity
          </p>
          <p>{qty} in stock</p>
        </div>
        <div className="flex justify-between">
          <p className="flex items-center gap-2 font-semibold">
            <BsTelephoneFill className="text-xl" />
            Contact
          </p>
          <p>{tel}</p>
        </div>
        <div className="flex items-center justify-center">
          {href ? (
            <Link href={href}>
              <Btn
                content={"Learn More"}
                styles="bg-primary text-secondary min-w-44"
              />
            </Link>
          ) : (
            <Btn
              content={"Learn More"}
              styles="bg-primary text-secondary min-w-44"
            />
          )}
        </div>
      </div>
    </div>
  );
}

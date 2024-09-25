"use client";

import CardCarousel from "./CardCarousel";
import { IoIosPricetag } from "react-icons/io";
import { FaBox } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import Link from "next/link";
import Btn from "../Btn";
import Image from "next/image";

type Props = {
  user: {
    companyName: string | null;
    phone: string | null;
    image: string | null;
    city: string | null;
    stateProvince: string | null;
  } | null;
  formData?: {
    id?: string;
    title: string;
    type: string;
    width: string;
    height: string;
    images: string[];
    price: string;
    salePrice?: string;
    qty: number;
    color: string;
  };
};

export default function Card({ user, formData }: Props) {
  let colorCode = ""; // default color

  switch (formData?.color) {
    case "Black":
      colorCode = "bg-black";
      break;
    case "Red":
      colorCode = "bg-red-500";
      break;
    case "Blue":
      colorCode = "bg-blue-500";
      break;
    case "Yellow":
      colorCode = "bg-yellow-500";
      break;
    case "Brown":
      colorCode = "bg-[#A52A2A]";
      break;
    case "Green":
      colorCode = "bg-green-500";
      break;
    case "White":
      colorCode = "bg-white";
      break;
      case "Gray":
        colorCode = "bg-gray-400";
        break;
    default:
      colorCode = "bg-black"; // fallback color
  }
  return (
    <div className="flex min-h-[500px] w-[400px] flex-col items-center gap-4 rounded-md bg-gradient-to-b from-secondary to-neutral-200 px-6 py-6 text-primary shadow-lg">
      <div className="flex w-full flex-col gap-4 self-start">
        <div>
          <p className="text-xl font-bold mb-2">{formData?.title || "Stone Name"}</p>
          <div className="flex items-center gap-2">
            <Image
              src={user?.image || "/assets/avatar.png"}
              alt={`${user?.companyName} logo`}
              height={26}
              width={26}
              className="h-6 w-6 rounded-full border-2 border-primary bg-white object-cover"
            />
            <p className="">{user?.companyName}</p>
          </div>
        </div>
        <hr className="w-full" />
        <div>
          <p className="font-bold">{formData?.type || "Stone Type"}</p>
          <p className="flex items-center gap-2">
            <span
              className={`h-6 w-6 ${colorCode} rounded-full border-2 border-primary`}
            ></span>
            {formData?.color || "Pick a color"}
          </p>
        </div>
      </div>
      <CardCarousel images={formData?.images ? formData.images : [""]} />
      <div className="flex w-full flex-col gap-4 text-sm">
        <div className="flex justify-between">
          <p className="flex items-center gap-2 font-semibold">
            <IoIosPricetag className="text-xl" />
            Price
          </p>
          <div className="flex gap-4">
            <p
              className={`${formData?.salePrice ? "text-neutral-400 line-through" : ""}`}
            >
              ${formData?.price.toString().slice(0,7)} CAD
            </p>
            {formData?.salePrice && (
              <p className="text-red-500">${formData?.salePrice.toString().slice(0,7)} CAD</p>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <p className="flex items-center gap-2 font-semibold">
            <FaBox className="text-xl" />
            Quantity
          </p>
          <p>{formData?.qty.toString().slice(0,3) || "-"} in stock</p>
        </div>
        <div className="flex justify-between">
          <p className="flex items-center gap-2 font-semibold">
            <BsTelephoneFill className="text-xl" />
            Contact
          </p>
          <p>{user?.phone}</p>
        </div>
        <div className="flex items-center justify-center">
          {formData?.id ? (
            <Link href={`/product/${formData?.id}`}>
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

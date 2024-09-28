"use client";

import CardCarousel from "./CardCarousel";
import { IoIosPricetag } from "react-icons/io";
import { FaBox } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import { FaPencilRuler } from "react-icons/fa";
import Link from "next/link";
import Btn from "../Btn";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";

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
    colors: string[];
  };
};

export default function Card({ user, formData }: Props) {
  return (
    <div className="relative flex min-h-[500px] w-[400px] flex-col items-center gap-4 rounded-md bg-gradient-to-b from-secondary to-neutral-200 px-6 py-6 text-primary shadow-lg">
      {formData?.salePrice && (
        <div className="absolute top-0 rounded-b-md bg-red-500 px-2 py-1 font-semibold text-secondary">
          On Sale
        </div>
      )}
      <div className="flex w-full flex-col gap-4 self-start">
        <div>
          <p className="mb-2 text-xl font-bold">
            {formData?.title || "Stone Name"}
          </p>
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
          <div className="flex gap-1">
            {formData?.colors.map((color, index) => (
              <p key={index} className="flex items-center gap-2">
                <span
                  style={{ backgroundColor: color }}
                  className={`h-6 w-6 rounded-full border-2 border-primary`}
                ></span>
              </p>
            ))}
          </div>
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
              {formData?.price
                ? parseFloat(formData.price) <= 20000
                  ? formatPrice(parseFloat(formData.price))
                  : "Set a real price"
                : formatPrice(0)}
            </p>
            {formData?.salePrice && (
              <p className="text-red-500">
                {formData?.salePrice
                  ? parseFloat(formData.salePrice) <= 20000
                    ? formatPrice(parseFloat(formData.salePrice))
                    : "Set a real price"
                  : 0}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <p className="flex items-center gap-2 font-semibold">
            <FaBox className="text-xl" />
            Quantity
          </p>
          <p>
            {formData?.qty
              ? formData.qty <= 100
                ? Math.round(formData?.qty).toString().slice(0, 3)
                : 100
              : "-"}{" "}
            in stock
          </p>
        </div>
        <div className="flex justify-between">
          <p className="flex items-center gap-2 font-semibold">
            <FaPencilRuler className="text-xl" />
            Dimensions
          </p>
          {formData?.height && formData.width ? (
            parseFloat(formData.height) <= 150 &&
            parseFloat(formData.width) <= 150 ? (
              <p>
                {Math.round(parseFloat(formData?.height) * 100) / 100} in x{" "}
                {Math.round(parseFloat(formData?.width) * 100) / 100} in | {" "}
                {formData?.width && formData.height
                  ? Math.round(
                      (((Math.round((parseFloat(formData?.height) / 12) * 100) /
                        100) *
                        Math.round((parseFloat(formData?.width) / 12) * 100)) /
                        100) *
                        100,
                    ) / 100
                  : 0}{" "}
                ft<sup>2</sup>
              </p>
            ) : (
              <p>Invalid Dimensions</p>
            )
          ) : (
            <p>
              0 ft<sup>2</sup>
            </p>
          )}
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

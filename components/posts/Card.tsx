"use client";

import CardCarousel from "./CardCarousel";
import { IoIosPricetag } from "react-icons/io";
import { FaBox } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import { GiStoneTablet } from "react-icons/gi";
import { formatPrice } from "@/utils/formatPrice";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Btn from "../Btn";
import toast from "react-hot-toast";
import { Product, User } from "@/types";

type Props = {
  user: User | null;
  formData?: Product | null;
};

export default function Card({ user, formData }: Props) {
  const path = usePathname();
  const router = useRouter();

  const handleDelete = async (id: string, imageId: string[] | undefined) => {
    const confirmed = confirm("Are you sure you want to delete this product?");

    if (confirmed) {
      try {
        const res = await fetch("/api/post", {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ id, imageId }),
        });

        if (res.ok) {
          toast.success("Deleted Product");
          router.refresh();
        }
      } catch (error) {
        toast.error(
          "Something went wrong. Please try again later or contact support.",
        );
      }
    }
  };

  return (
    <div className="relative flex min-h-[500px] w-[400px] flex-col items-center gap-4 rounded-md bg-secondary text-primary shadow-lg">
      {formData?.salePrice && (
        <div className="absolute right-0 top-0 z-10 rounded-md rounded-tl-none bg-red-500 px-2 py-1 font-semibold text-primary">
          On Sale
        </div>
      )}
      <CardCarousel images={formData?.images ? formData.images : [""]} />
      <div className="flex w-full flex-col gap-4 text-sm">
        <div className="relative flex flex-col gap-4 px-6 pb-6 pt-2">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">{formData?.title || "Pick a name"}</p>
          </div>
          <div className="flex justify-between">
            <p className="flex items-center gap-2 font-semibold">
              <GiStoneTablet className="text-xl" />
              Material
            </p>
            <p>{formData?.type}</p>
          </div>
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
          {/* <div className="flex justify-between">
            <p className="flex items-center gap-2 font-semibold">
              <FaPencilRuler className="text-xl" />
              Dimensions
            </p>
            {formData?.height && formData.width ? (
              parseFloat(formData.height) <= 150 &&
              parseFloat(formData.width) <= 150 ? (
                <p>
                  {Math.round(parseFloat(formData?.height) * 100) / 100} in x{" "}
                  {Math.round(parseFloat(formData?.width) * 100) / 100} in |{" "}
                  {formData?.width && formData.height
                    ? Math.round(
                        (((Math.round(
                          (parseFloat(formData?.height) / 12) * 100,
                        ) /
                          100) *
                          Math.round(
                            (parseFloat(formData?.width) / 12) * 100,
                          )) /
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
          </div> */}
          <div className="flex justify-between">
            <p className="flex items-center gap-2 font-semibold">
              <BsTelephoneFill className="text-xl" />
              Contact
            </p>
            <p>{user?.phone}</p>
          </div>
          {path == "/vendor/dashboard" ? (
            <div className="flex items-center justify-between">
              <Link
                className=""
                href={`/vendor/dashboard/edit-product/${formData?.id}`}
              >
                <Btn styles="bg-secondary" content={"Edit"} />
              </Link>

              <Btn
                styles="bg-secondary"
                content={"Delete"}
                onClick={() =>
                  handleDelete(formData?.id || "", formData?.imageId)
                }
              />
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}

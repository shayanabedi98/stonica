"use client";

import CardCarousel from "./CardCarousel";
import { IoIosPricetag } from "react-icons/io";
import { FaBox } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import { GiStoneTablet } from "react-icons/gi";
import { IoBookmark } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import { formatPrice } from "@/utils/formatPrice";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Btn from "../Btn";
import toast from "react-hot-toast";
import { Product, User } from "@/types";

type Props = {
  signedInUser?: User | null;
  user: User | null;
  formData?: Product | null;
};

export default function Card({ signedInUser, user, formData }: Props) {
  const path = usePathname();
  const router = useRouter();

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
    <div className="bg-color4 relative flex min-h-[500px] w-[400px] flex-col items-center gap-4 rounded-md text-primary shadow-lg">
      {formData?.salePrice && (
        <div className="roundedtr-md absolute right-0 top-0 z-10 rounded-bl-md bg-red-500 px-2 py-1 font-semibold text-primary">
          On Sale
        </div>
      )}
      <CardCarousel images={formData?.images ? formData.images : [""]} />
      <div className="flex w-full flex-col gap-4 text-sm">
        <div className="relative flex flex-col gap-4 px-6 pb-6 pt-2">
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl font-semibold">
              {formData?.title || "Pick a name"}
            </p>
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
                className={`${formData?.salePrice ? "text-neutral-300 line-through" : ""}`}
              >
                {formData?.price
                  ? parseFloat(formData.price) <= 20000
                    ? formatPrice(parseFloat(formData.price))
                    : "Set a real price"
                  : formatPrice(0)}
              </p>
              {formData?.salePrice && (
                <p className="font-semibold text-red-500">
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
                <Link href={`/products/${formData?.id}`}>
                  <Btn content={"Learn More"} styles="bg-color1" />
                </Link>
              ) : (
                <Btn content={"Learn More"} styles="bg-color1" />
              )}
            </div>
          )}
          {/* Wishlist button */}
          {path.includes("/vendor") === false && (
            <div
              className="absolute bottom-8 right-10 flex cursor-pointer items-center justify-center gap-1 transition"
              onClick={() => handleWishlist(formData?.id)}
            >
              {signedInUser?.wishlist?.includes(formData?.id as string) ? (
                <IoBookmark className="wishlist" />
              ) : (
                <IoBookmarkOutline className="wishlist" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

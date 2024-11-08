"use client";

import CardCarousel from "../products/CardCarousel";
import { IoIosPricetag } from "react-icons/io";
import { FaBox } from "react-icons/fa";
import { formatPrice } from "@/utils/formatPrice";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Btn from "../Btn";
import toast from "react-hot-toast";
import { Product, User } from "@/types";
import Image from "next/image";

type Props = {
  signedInUser?: User | null;
  formData?: Product | null;
};

export default function Card({ signedInUser, formData }: Props) {
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
    <div className="card-shadow relative flex flex-col items-center gap-4 rounded-md bg-secondary text-sm text-primary">
      {formData?.salePrice && (
        <div className="roundedtr-md absolute right-0 top-0 z-10 rounded-bl-md bg-red-500 px-2 py-1 font-semibold text-primary">
          On Sale
        </div>
      )}
      <CardCarousel images={formData?.images ? formData.images : [""]} />
      <div className="card-carousel-gradient absolute left-0 top-0 flex h-96 w-full flex-col justify-end gap-3 px-5 py-2">
        <div className="flex flex-col justify-center gap-1">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => {
              formData?.User
                ? router.push(`/vendor/${formData?.User?.id}`)
                : router.push(`/vendor/${signedInUser?.id}`);
            }}
          >
            <Image
              src={
                formData?.User?.image ||
                signedInUser?.image ||
                "/assets/avatar.png"
              }
              alt="Vendor profile picture"
              height={24}
              width={24}
              className="rounded-full"
            />
            <p className="font-semibold">
              {formData?.User?.companyName || signedInUser?.companyName}
            </p>
          </div>
          <p className="text-2xl font-bold">
            {formData?.title || "Pick a name"}
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 px-5 pb-4">
        <div className="flex gap-2">
          <p className="flex items-center justify-center gap-2 rounded-2xl bg-color1 px-2 py-1 font-semibold">
            {formData?.type}
          </p>
        </div>
        <div className="flex gap-2">
          <IoIosPricetag className="text-xl" />
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
        <div className="flex gap-2">
          <FaBox className="text-xl" />
          <p>
            {formData?.qty
              ? formData.qty <= 100
                ? Math.round(formData?.qty).toString().slice(0, 3)
                : 100
              : "-"}{" "}
            in stock
          </p>
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
          <div className="flex items-center justify-center gap-3">
            {formData?.id ? (
              <Link className="w-full" href={`/products/${formData?.id}`}>
                <button className="product-card-button">{"Learn More"}</button>
              </Link>
            ) : (
              <button className="product-card-button">{"Learn More"}</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

{
  /* <div className="flex justify-between">
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
          </div> */
}

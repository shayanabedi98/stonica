"use client";

import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import Select from "./Select";
import Image from "next/image";
import toast from "react-hot-toast";
import { Widget } from "@uploadcare/react-widget";
import { GoPlus } from "react-icons/go";
import Card from "../products/Card";
import Btn from "../Btn";
import { useRouter } from "next/navigation";
import { Product, User } from "@/types";

type Props = {
  user: User | null;
  pubKey: string;
  postData?: Product
  fetchMethod: "PUT" | "POST";
};

export default function PostForm({
  postData,
  user,
  fetchMethod,
  pubKey,
}: Props) {
  const [formData, setFormData] = useState({
    id: postData?.id,
    title: postData?.title || "",
    type: postData?.type || "",
    textureType: postData?.textureType || "Matte/Honed",
    width: postData?.width || "",
    height: postData?.height || "",
    images: postData?.images || [],
    price: postData?.price || "",
    salePrice: postData?.salePrice || "",
    qty: postData?.qty || 0,
    veins: postData?.veins || "Thin",
    bookmatched: postData?.bookmatched || "No",
    colors: postData?.colors || ["Black", "None", "None"],
    imageId: postData?.imageId || [],
  });
  const colorOptions = [
    "None",
    "White",
    "Black",
    "Gray",
    "Beige",
    "Brown",
    "Red",
    "Green",
    "Blue",
    "Yellow",
    "Pink",
    "Gold",
    "Cream",
    "Silver",
  ];
  const [waitingForDelete, setWaitingForDelete] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const widgetRefs = useRef<Array<any>>([]);
  const router = useRouter();

  useEffect(() => {
    const handleUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const openWidget = (index: number) => {
    if (widgetRefs.current[index]) {
      widgetRefs.current[index].openDialog();
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageUpload = (index: number, info: any) => {
    setFormData((prev) => {
      const newImages = [...(prev.images || [])];
      newImages[index] = info.cdnUrl;
      return { ...prev, images: newImages };
    });
    setFormData((prev) => {
      const newImages = [...(prev.imageId || [])];
      newImages[index] = info.uuid;
      return { ...prev, imageId: newImages };
    });
  };

  const handleRemoveImage = async (id: string, index: number) => {
    if (fetchMethod == "POST") {
      try {
        const res = await fetch("/api/upload-care", {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ id }),
        });

        if (res.ok) {
          toast.success("Removed Image");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to remove image");
      } finally {
        const newImages = formData.images.filter((_, idx) => idx !== index);
        setFormData((prev) => ({ ...prev, images: newImages }));
      }
    } else if (fetchMethod == "PUT") {
      const newImageId = formData.imageId.filter((i) => i !== id);
      const newImages = formData.images.filter((_, idx) => idx !== index);
      setFormData((prev) => ({
        ...prev,
        imageId: newImageId,
        images: newImages,
      }));
      setWaitingForDelete((prev) => [...prev, id]);
    }
  };

  const handleColorChange = (name: string, value: string) => {
    const colors = ["base", "vein", "secondary"];
    const index = colors.indexOf(name);
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.map((i, idx) => (idx === index ? value : i)),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.images.length < 1) {
      toast.error("Please provide at least 1 image");
      return;
    }

    if (formData.colors[0] == "None") {
      toast.error("Please pick a base color");
      return;
    }

    try {
      const res = await fetch("/api/post", {
        method: fetchMethod,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ formData, waitingForDelete }),
      });

      if (res.ok) {
        if (fetchMethod == "POST") {
          toast.success("Created Post");
          router.push("/vendor/dashboard");
          router.refresh();
        } else {
          toast.success("Updated Post");
          router.push("/vendor/dashboard");
          router.refresh();
        }
      }
    } catch (error) {
      toast.error("Something went wrong, try again later or contact us");
    }
  };

  return (
    <div className="flex w-full justify-center gap-20">
      <div className="flex w-1/3 flex-col items-center justify-center">
        <Card user={user} formData={formData} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex w-2/3 gap-3 rounded-md bg-secondary px-4 py-4 text-primary"
      >
        <div className="flex w-1/2 flex-col gap-4">
          <Input
            maxLength={30}
            name="title"
            type="text"
            label="Stone Name"
            value={formData.title}
            placeholder="Name"
            onChange={handleChange}
          />
          <Select
            options={[
              "- Select Type -",
              "Marble",
              "Quartz",
              "Porcelain",
              "Onyx",
              "Granite",
            ]}
            label="Stone Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
          {/* COLORS */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between gap-1">
              <Select
                label="Base Color"
                options={colorOptions}
                name="base"
                value={formData.colors[0]}
                onChange={handleColorChange}
              />
              <Select
                label="Vein Color"
                options={colorOptions}
                name="vein"
                value={formData.colors[1]}
                onChange={handleColorChange}
              />
              <Select
                label="Second Color"
                options={colorOptions}
                name="secondary"
                value={formData.colors[2]}
                onChange={handleColorChange}
              />
            </div>
          </div>
          <div className="flex gap-1">
            <div className="flex w-full flex-col gap-2">
              <Select
                label="Veins"
                name="veins"
                onChange={handleChange}
                value={formData.veins}
                options={["None", "Thick", "Thin"]}
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <Select
                label="Bookmatched"
                name="bookmatched"
                onChange={handleChange}
                value={formData.bookmatched}
                options={["Yes", "No"]}
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <Select
                label="Texture Type"
                name="textureType"
                onChange={handleChange}
                value={formData.textureType}
                options={["Polished/Shiny", "Matte/Honed"]}
              />
            </div>
          </div>
          {/* IMAGES */}
          <div className="flex flex-col gap-2">
            <label htmlFor="image">Images</label>
            <div className="flex justify-between">
              {[...Array(3)].map((_, index) => (
                <div
                  onClick={() => {
                    !formData.images[index] && openWidget(index);
                  }}
                  key={index}
                  className={`relative flex h-28 w-28 flex-col items-center justify-center rounded-md bg-secondary transition lg:hover:bg-accent ${formData.images[index] ? "cursor-default" : "cursor-pointer lg:hover:bg-accent"}`}
                >
                  {formData.images[index] ? (
                    <div>
                      <Image
                        src={formData.images[index]}
                        alt=""
                        quality={100}
                        fill
                        className="rounded-md object-cover"
                      />
                      <span
                        className="absolute bottom-0 left-0 right-0 flex h-6 cursor-pointer items-center justify-center bg-primary text-sm font-semibold text-secondary transition lg:hover:bg-accent"
                        onClick={() =>
                          handleRemoveImage(formData.imageId[index], index)
                        }
                      >
                        Remove
                      </span>
                    </div>
                  ) : (
                    <GoPlus className="text-4xl text-primary" />
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Hidden Widgets, each tied to an index */}
          {[...Array(3)].map((_, index) => (
            <div key={index} className="hidden">
              <Widget
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ref={(el: any) => (widgetRefs.current[index] = el)}
                imagesOnly
                publicKey={pubKey}
                onChange={(info) => handleImageUpload(index, info)}
                tabs="file url"
                preferredTypes="image/*"
                imageShrink="1024x1024"
                imagePreviewMaxSize={4000000}
              />
            </div>
          ))}
        </div>
        <div className="flex w-1/2 flex-col gap-4">
          <Input
            min={1}
            max={100}
            name="qty"
            type="number"
            label="Quantity in Stock"
            value={formData.qty}
            placeholder="1 - 100"
            onChange={handleChange}
          />
          <Input
            min={0.01}
            max={20000}
            name="price"
            type="number"
            label="Price (CAD)"
            value={formData.price}
            placeholder="$1000"
            step={0.01}
            onChange={handleChange}
          />
          <Input
            min={0.01}
            notRequired
            max={formData.price ? parseFloat(formData.price) - 1 : undefined}
            name="salePrice"
            type="number"
            label="Sale Price (CAD) (Optional)"
            value={formData.salePrice}
            placeholder="$1000"
            step={0.01}
            onChange={handleChange}
          />
          <Input
            min={0.01}
            max={150}
            name="width"
            type="number"
            label="Stone Width (Inch)"
            value={formData.width}
            placeholder="Inches"
            step={0.01}
            onChange={handleChange}
          />
          <Input
            min={0.01}
            max={150}
            name="height"
            type="number"
            label="Stone Height (Inch)"
            value={formData.height}
            placeholder="Inches"
            step={0.01}
            onChange={handleChange}
          />
          <Btn
            content={
              fetchMethod == "POST" ? "Create Product" : "Update Product"
            }
            styles="bg-secondary"
          />
        </div>
      </form>
    </div>
  );
}

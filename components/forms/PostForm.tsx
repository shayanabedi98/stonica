"use client";

import { useRef, useState } from "react";
import Input from "./Input";
import Select from "./Select";
import Image from "next/image";
import toast from "react-hot-toast";
import { Widget } from "@uploadcare/react-widget";
import { GoPlus } from "react-icons/go";
import Card from "../posts/Card";

type Props = {
  user: {
    companyName: string | null;
    phone: string | null;
    image: string | null;
    city: string | null;
    stateProvince: string | null;
  } | null;
  pubKey: string;
  postData?: {
    id: string;
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
  task: "edit" | "create";
};

export default function PostForm({ postData, user, task, pubKey }: Props) {
  const [formData, setFormData] = useState({
    title: postData?.title || "",
    type: postData?.type || "",
    width: postData?.width || "",
    height: postData?.height || "",
    images: postData?.images || [],
    price: postData?.price || "",
    salePrice: postData?.salePrice || "",
    qty: postData?.qty || 0,
    color: postData?.color || "",
  });
  const [imageId, setImageId] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const widgetRefs = useRef<Array<any>>([]);

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
    setImageId((prev) => {
      const newImageIds = [...(prev || [])];
      newImageIds[index] = info.uuid;
      return newImageIds;
    });
  };

  const handleRemoveImage = async (id: string, index: number) => {
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
  };

  return (
    <div className="flex gap-4">
      <Card user={user} formData={formData} />
      <form className="form">
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
        <Select
          options={[
            "- Select Type -",
            "White",
            "Black",
            "Gray",
            "Brown",
            "Red",
            "Green",
            "Blue",
            "Yellow",
          ]}
          label="Color"
          name="color"
          value={formData.color}
          onChange={handleChange}
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="image">Images</label>
          <div className="flex justify-between">
            {[...Array(3)].map((_, index) => (
              <div
                onClick={() => {
                  !formData.images[index] && openWidget(index);
                }}
                key={index}
                className={`relative flex h-32 w-32 flex-col items-center justify-center rounded-md bg-secondary transition lg:hover:bg-accent ${formData.images[index] ? "cursor-default" : "cursor-pointer"}`}
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
                      className="absolute bottom-0 left-0 right-0 flex cursor-pointer justify-center rounded-b-md border-t-2 bg-red-500 text-sm font-semibold"
                      onClick={() => handleRemoveImage(imageId[index], index)}
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
          max={parseFloat(formData.price)}
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
          max={200}
          name="height"
          type="number"
          label="Stone height (Inch)"
          value={formData.height}
          placeholder="Inches"
          step={0.01}
          onChange={handleChange}
        />
        <Input
          min={0.01}
          max={200}
          name="width"
          type="number"
          label="Stone Width (Inch)"
          value={formData.width}
          placeholder="Inches"
          step={0.01}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

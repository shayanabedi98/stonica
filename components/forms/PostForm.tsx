"use client";

import { useRef, useState } from "react";
import Input from "./Input";
import Select from "./Select";
import Image from "next/image";
import toast from "react-hot-toast";
import { Widget } from "@uploadcare/react-widget";

type Props = {
  pubKey: string;
  postData?: {
    title: string;
    type: string;
    width: string;
    height: string;
    images: string[] | null;
    price: string;
    salePrice?: string;
    qty: number;
    color: string;
  };
  task: "edit" | "create";
};

export default function PostForm({ postData, task, pubKey }: Props) {
  const [formData, setFormData] = useState({
    title: postData?.title || "",
    type: postData?.title || "",
    width: postData?.title || "",
    height: postData?.height || "",
    images: postData?.images || null,
    price: postData?.price || "",
    salePrice: postData?.salePrice || "",
    qty: postData?.qty || 0,
    color: postData?.color || "",
  });

  const widgetRef = useRef(null);

  const openWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.openDialog();
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageUpload = (info: any) => {
    setFormData((prev) => ({
      ...prev,
      images: info.cdnUrl,
      imageId: info.uuid,
    }));
    console.log(info);
  };

  const handleRemoveImage = async (id: string) => {
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
      setFormData((prev) => ({ ...prev, image: "" }));
    }
  };

  return (
    <form className="form">
      <Input
        name="title"
        type="text"
        label="Stone Name"
        value={formData.title}
        placeholder="Name"
        onChange={handleChange}
      />
      <Select
        options={["Marble", "Quartz", "Porcelain", "Onyx", "Granite"]}
        label="Stone Type"
        name="type"
        value={formData.type}
        onChange={handleChange}
      />
      <Select
        options={[
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
        <span
          onClick={openWidget}
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Upload Image
        </span>
        <label htmlFor="image">Company Logo</label>
        <div className="hidden">
          <Widget
            ref={widgetRef}
            imagesOnly
            publicKey={pubKey}
            onChange={handleImageUpload}
            tabs="file url"
            preferredTypes="image/*"
            crop="1:1"
            imageShrink="1024x1024"
            imagePreviewMaxSize={4000000}
            // clearable={true}
            // crop="400x400"
            // multiple={true}
            // multipleMax={3}
          />
        </div>
      </div>
    </form>
  );
}

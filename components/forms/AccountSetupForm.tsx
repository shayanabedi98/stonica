/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import Input from "./Input";
import Btn from "../Btn";
import toast from "react-hot-toast";
import Loader from "../other/Loader";
import { useRouter } from "next/navigation";
import { Widget } from "@uploadcare/react-widget";
import Image from "next/image";
import { GoPlus } from "react-icons/go";

type User = {
  name: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  street: string | null;
  aptNum: string | null;
  city: string | null;
  stateProvince: string | null;
  zipPostalCode: string | null;
  image: string | null;
  imageId: string | null;
  instagram: string | null;
  facebook: string | null;
  website: string | null;
};

type Props = {
  existingUserData: User;
  pubKey: string;
  fetchMethod: "PUT" | "POST";
};

export default function AccountSetupForm({
  existingUserData,
  pubKey,
  fetchMethod,
}: Props) {
  const [formData, setFormData] = useState({
    name: existingUserData.name || "",
    email: existingUserData.email || "",
    phone: existingUserData.phone || "",
    image: existingUserData.image || "",
    imageId: existingUserData.imageId || "",
    companyName: existingUserData.companyName || "",
    street: existingUserData.street || "",
    aptNum: existingUserData.aptNum || "",
    city: existingUserData.city || "",
    stateProvince: existingUserData.stateProvince || "",
    zipPostalCode: existingUserData.zipPostalCode || "",
    instagram: existingUserData.instagram || "",
    facebook: existingUserData.facebook || "",
    website: existingUserData.website || "",
  });
  const [waitingForDelete, setWaitingForDelete] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const widgetRefs = useRef<any>();

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openWidget = () => {
    if (widgetRefs.current) {
      widgetRefs.current.openDialog();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageUpload = (info: any) => {
    setFormData((prev) => ({
      ...prev,
      image: info.cdnUrl,
      imageId: info.uuid,
    }));
  };

  const handleRemoveImage = async (id: string) => {
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
        setFormData((prev) => ({ ...prev, image: "" }));
      }
    } else if (fetchMethod == "PUT") {
      toast.success("Removed Image");
      setFormData((prev) => ({ ...prev, imageId: "", image: "" }));
      setWaitingForDelete(id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const requiredFields = Object.keys(formData).filter(
      (key) =>
        ["aptNum", "instagram", "facebook", "website"].includes(key) == false,
    );

    if (requiredFields.some((key) => !formData[key as keyof typeof formData])) {
      setLoading(false);
      toast.error("Can't leave any required field empty");
      return;
    }

    try {
      const address = `${formData.street}, ${formData.aptNum ? formData.aptNum : ""}, ${formData.city}, ${formData.stateProvince}, ${formData.zipPostalCode},`;

      const geoRes = await fetch("/api/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      });

      const geoData = await geoRes.json();

      if (!geoRes.ok) {
        throw new Error(geoData.error || "Failed to fetch geolocation");
      }

      // Only proceed with settings update if geocoding was successful
      const res = await fetch("/api/account-settings", {
        method: fetchMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
          waitingForDelete,
        }),
      });

      if (res.ok) {
        toast.success("Updated information");
        router.push("/vendor/dashboard");
        router.refresh();
      } else {
        throw new Error("Failed to update account information");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Error submitting form");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="account-setup-form">
      <label className="text-sm font-semibold">Company Logo *</label>
      <div
        onClick={() => {
          !formData.image && openWidget();
        }}
        className={`flex flex-col items-center justify-center rounded-md bg-secondary transition ${formData.image ? "cursor-default" : "cursor-pointer lg:hover:bg-accent"}`}
      >
        {formData.image ? (
          <div className="relative h-40 w-40">
            <Image
              src={formData.image}
              alt=""
              quality={100}
              fill
              className="rounded-md object-cover"
            />
            <span
              className="absolute bottom-0 left-0 right-0 flex h-6 cursor-pointer items-center justify-center bg-primary text-sm font-semibold text-secondary transition lg:hover:bg-accent"
              onClick={() => handleRemoveImage(formData.imageId)}
            >
              Remove
            </span>
          </div>
        ) : (
          <GoPlus className="text-4xl text-primary" />
        )}
        <div className="hidden">
          <Widget
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref={(el: any) => (widgetRefs.current = el)}
            imagesOnly
            publicKey={pubKey}
            onChange={(info) => handleImageUpload(info)}
            tabs="file url"
            preferredTypes="image/*"
            imageShrink="1024x1024"
            imagePreviewMaxSize={4000000}
          />
        </div>
      </div>
      <Input
        label="Name *"
        placeholder="Pick a name"
        name="name"
        type="text"
        autoComplete="off"
        value={formData.name}
        onChange={handleChange}
      />
      <Input
        disabled
        label="Email"
        placeholder="Pick a name"
        name="email"
        type="email"
        autoComplete="off"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        label="Company Name *"
        placeholder="Stone Supplier Co."
        name="companyName"
        type="text"
        autoComplete="off"
        value={formData.companyName}
        onChange={handleChange}
      />
      <Input
        label="Phone *"
        placeholder="1234567890"
        name="phone"
        type="tel"
        pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
        autoComplete="off"
        value={formData.phone}
        onChange={handleChange}
      />
      <Input
        label="Street Address *"
        placeholder="123 Helen Avenue"
        name="street"
        type="text"
        autoComplete="off"
        value={formData.street}
        onChange={handleChange}
      />
      <Input
        notRequired
        label="Apt/Unit Number"
        placeholder="Unit 9"
        name="aptNum"
        type="text"
        autoComplete="off"
        value={formData.aptNum}
        onChange={handleChange}
      />
      <Input
        label="City *"
        placeholder="Toronto"
        name="city"
        type="text"
        autoComplete="off"
        value={formData.city}
        onChange={handleChange}
      />
      <Input
        label="State/Province *"
        placeholder="Ontario"
        name="stateProvince"
        type="text"
        autoComplete="off"
        value={formData.stateProvince}
        onChange={handleChange}
      />
      <Input
        label="Zip/Postal Code *"
        placeholder="A1A 1A1"
        name="zipPostalCode"
        type="text"
        autoComplete="off"
        value={formData.zipPostalCode}
        onChange={handleChange}
      />
      <Input
        notRequired
        label="Instagram (URL)"
        placeholder="Instagram URL"
        name="instagram"
        type="text"
        autoComplete="off"
        value={formData.instagram}
        onChange={handleChange}
      />
      <Input
        notRequired
        label="Facebook (URL)"
        placeholder="Instagram URL"
        name="facebook"
        type="text"
        autoComplete="off"
        value={formData.facebook}
        onChange={handleChange}
      />
      <Input
        notRequired
        label="Website (URL)"
        placeholder="https://www.company.com"
        name="website"
        type="text"
        autoComplete="off"
        value={formData.website}
        onChange={handleChange}
      />
      <Btn
        content={loading ? <Loader /> : "Update Info"}
        styles="bg-primary w-36 mx-auto"
      />
    </form>
  );
}

"use client";

import { useState } from "react";
import Input from "./Input";
import Btn from "../Btn";
import toast from "react-hot-toast";
import Loader from "../other/Loader";
import { useRouter } from "next/navigation";

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
};

type Props = {
  existingUserData: User;
};

export default function AccountSetupForm({ existingUserData }: Props) {
  const [formData, setFormData] = useState({
    name: existingUserData.name || "",
    email: existingUserData.email || "",
    phone: existingUserData.phone || "",
    // companyLogo: existingUserData.companyLogo || "",
    companyName: existingUserData.companyName || "",
    street: existingUserData.street || "",
    aptNum: "",
    city: "",
    stateProvince: "",
    zipPostalCode: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const requiredFields = Object.keys(formData).filter(
      (key) => key !== "aptNum",
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
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
        }),
      });

      if (res.ok) {
        toast.success("Updated information");
        router.push("/vendor/dashboard");
        router.refresh();
      } else {
        throw new Error("Failed to update settings");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Error submitting form");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
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
      <Btn content={loading ? <Loader /> : "Update Info"} styles="bg-primary" />
    </form>
  );
}

"use client";

import { useState } from "react";
import Input from "./Input";
import Btn from "../Btn";
import Loader from "../other/Loader";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    if (!formData.email) {
      toast.error("Please provide an email address");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });
      const data = await res.json();
      if (res?.ok) {
        toast.success("Email Sent");
        setLoading(false);
        setFormData({
          email: "",
        });
      } else {
        if ((data.message = "User not found")) {
          toast.error("Email address not found");
          setLoading(false);
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
      setFormData({
        email: "",
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="text-center">Provide an email address</p>
      <Input
        value={formData.email}
        placeholder="johndoe@email.com"
        name="email"
        label="Email"
        type="email"
        onChange={handleChange}
      />
      <Btn
        content={loading ? <Loader /> : "Request Reset"}
        styles="bg-primary"
      />
      <span className="px-2 py-1 text-sm text-center">
        Never mind, take me back{" "}
        <Link className="underline" href={"/sign-in"}>
          Click here
        </Link>
      </span>
    </form>
  );
}

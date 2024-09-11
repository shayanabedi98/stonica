"use client";

import { useState } from "react";
import Input from "./Input";
import Btn from "../Btn";
import Loader from "../other/Loader";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const specialCharsRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?]/g;
    const capitalLetterRegex = /[A-Z]/;
    const numberRegex = /\d/;

    e.preventDefault();

    setLoading(true);

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please complete all fields");
      setLoading(false);
      return;
    }

    if (formData.confirmPassword != formData.password) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.includes(" ")) {
      toast.error("Your password should not have any spaces");
      setLoading(false);
      return;
    }

    if (
      !capitalLetterRegex.test(formData.password) ||
      !specialCharsRegex.test(formData.password) ||
      !numberRegex.test(formData.password)
    ) {
      toast.error("Password is not meeting requirements");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      if (res.ok) {
        toast.success("Created Account");
        setLoading(false);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        router.push("/sign-in");
      } else {
        const errorData = await res.json();
        if (errorData.message === "User already exists") {
          toast.error("User already exists. Please use a different email.");
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-lg">
      <form
        className="form mt-4 flex min-w-[380px] flex-col gap-5 rounded-md bg-primary px-8 py-4 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h3 className="self-center">Sign up</h3>
        <Input
          autoComplete="off"
          placeholder="John Doe"
          name="name"
          label="Name"
          type="text"
          onChange={handleChange}
        />
        <Input
          placeholder="johndoe@johnny.com"
          name="email"
          label="Email"
          type="email"
          onChange={handleChange}
        />
        <Input
          placeholder="New Password"
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
        />
        <div className="text-xs">
          <p>Minimum Requirements:</p>
          <ul className="list-disc pl-4">
            <li>8 characters</li>
            <li>1 special character and number</li>
            <li>1 capital letter</li>
          </ul>
        </div>
        <Input
          placeholder="Confirm password"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          onChange={handleChange}
        />
        <Btn content={loading ? <Loader /> : "Sign Up"} styles="bg-primary" />
        <span className="px-2 py-1 text-sm">
          Already have an account?{" "}
          <Link className="underline" href={"/sign-in"}>
            Click here
          </Link>
        </span>
      </form>
    </div>
  );
}

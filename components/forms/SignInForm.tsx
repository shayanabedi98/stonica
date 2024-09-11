"use client";

import { useState } from "react";
import Input from "./Input";
import Btn from "../Btn";
import Loader from "../other/Loader";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    if (!formData.email || !formData.password) {
      toast.error("Please complete all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email.toLowerCase(),
        password: formData.password,
      });

      if (res?.ok) {
        toast.success("Signed in");
        setLoading(false);
        setFormData({
          email: "",
          password: "",
        });
        router.push("/vendor/dashboard");
      }

      if (res?.error) {
        toast.error("Wrong username and password combination");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-lg">
      <form
        className="form mt-10 flex min-w-[380px] flex-col gap-4 px-8 py-4"
        onSubmit={handleSubmit}
      >
        <h3 className="self-center">Welcome back!</h3>
        <Input
          value={formData.email}
          placeholder="johndoe@johnny.com"
          name="email"
          label="Email"
          type="email"
          onChange={handleChange}
        />
        <Input
          value={formData.password}
          placeholder="New Password"
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
        />
        <Btn content={loading ? <Loader /> : "Sign In"} styles="bg-primary" />
        <span className="px-2 py-1 text-sm">
          Don&apos;t have an account?{" "}
          <Link className="underline" href={"/register"}>
            Click here
          </Link>
        </span>
        <Link
          className="px-2 py-1 text-center text-sm underline"
          href={"/vendor/forgot-password"}
        >
          Forgot Password?
        </Link>
      </form>
    </div>
  );
}

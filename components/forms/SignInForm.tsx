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
        router.refresh();
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
    <form className="form" onSubmit={handleSubmit}>
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
        showPasswordOption
        value={formData.password}
        placeholder="Password"
        name="password"
        label="Password"
        type="password"
        onChange={handleChange}
      />
      <Btn content={loading ? <Loader /> : "Sign In"} styles="bg-primary" />
      <span className="px-2 py-1 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link className="underline" href={"/join#options"}>
          Click here
        </Link>
      </span>
      <Link
        className="px-2 py-1 text-center text-sm underline"
        href={"/forgot-password"}
      >
        Forgot Password?
      </Link>
    </form>
  );
}

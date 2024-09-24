"use client";

import { useEffect, useState } from "react";
import Input from "./Input";
import Btn from "../Btn";
import Loader from "../other/Loader";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [meetsRequirements, setMeetsRequirements] = useState({
    minLength: false,
    specialChar: false,
    numChar: false,
    capChar: false,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const specialCharsRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?]/g;
  const capitalLetterRegex = /[A-Z]/;
  const numberRegex = /\d/;

  useEffect(() => {
    if (!token) {
      router.push("/forgot-password");
    }

    const { password } = formData;

    setMeetsRequirements({
      minLength: password.length >= 8,
      specialChar: specialCharsRegex.test(password),
      numChar: numberRegex.test(password),
      capChar: capitalLetterRegex.test(password),
    });
  }, [formData.password]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    if (!formData.password || !formData.confirmPassword) {
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
      toast.error("Password does not meet requirements");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ token, formData }),
      });
      if (res.ok) {
        toast.success("Updated Password");
        setLoading(false);
        setFormData({
          password: "",
          confirmPassword: "",
        });
        router.push("/vendor/sign-in");
      }
    } catch (error) {
      toast.error("Something wen wrong, try again later");
      setLoading(false);
      setFormData({
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <h3 className="self-center">Reset Password</h3>
        <Input
          value={formData.password}
          placeholder="New Password"
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
        />
        <div className="text-xs">
          <p>Minimum Requirements:</p>
          <ul className="list-disc pl-4">
            <li
              className={
                meetsRequirements.minLength ? "text-green-500" : "text-red-500"
              }
            >
              8 characters
            </li>
            <li
              className={
                meetsRequirements.specialChar
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              1 special character
            </li>
            <li
              className={
                meetsRequirements.numChar ? "text-green-500" : "text-red-500"
              }
            >
              1 number
            </li>
            <li
              className={
                meetsRequirements.capChar ? "text-green-500" : "text-red-500"
              }
            >
              1 capital letter
            </li>
          </ul>
        </div>
        <Input
          value={formData.confirmPassword}
          placeholder="Confirm password"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          onChange={handleChange}
        />
        <Btn
          content={loading ? <Loader /> : "Reset Password"}
          styles="bg-primary"
        />
      </form>
  );
}

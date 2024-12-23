"use client";

import { useEffect, useState, useRef } from "react";
import Input from "./Input";
import Btn from "../Btn";
import Loader from "../other/Loader";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoMdArrowDropdown } from "react-icons/io";

export default function SignUpForm({
  userType,
}: {
  userType: "shopper" | "vendor";
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: userType,
  });
  const [meetsRequirements, setMeetsRequirements] = useState({
    minLength: false,
    specialChar: false,
    numChar: false,
    capChar: false,
  });
  const [showRequirements, setShowRequirements] = useState(false);

  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hiddenTokenRef = useRef<any>(null); // Reference for hidden field

  const specialCharsRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?]/g;
  const capitalLetterRegex = /[A-Z]/;
  const numberRegex = /\d/;

  useEffect(() => {
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

    // Generate a unique token for this form submission
    const securityToken = Math.random().toString(36).substring(2);

    if (hiddenTokenRef.current) {
      hiddenTokenRef.current.value = securityToken; // Set the hidden input's value
    }

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
      toast.error("Password does not meet requirements");
      setShowRequirements(true);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ formData, securityToken }), // Send securityToken
      });
      if (res.ok) {
        toast.success("Created Account");
        setLoading(false);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          userType,
        });
        router.push("/sign-in");
        router.refresh();
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
        userType,
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="self-center">
        {userType == "vendor" ? "Vendor" : "Shopper"} Sign up
      </h3>
      <Input
        value={formData.name}
        autoComplete="off"
        placeholder="John Doe"
        name="name"
        label="Name"
        type="text"
        onChange={handleChange}
      />
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
        placeholder="Enter Password"
        name="password"
        label="Password"
        showPasswordOption
        type="password"
        onChange={handleChange}
      />
      <div className="relative select-none text-xs">
        <p>Minimum Requirements:</p>
        <IoMdArrowDropdown
          className={`absolute right-0 top-0 cursor-pointer text-3xl transition duration-150 lg:hover:scale-110 ${showRequirements ? "rotate-180" : ""}`}
          onClick={() => setShowRequirements(!showRequirements)}
        />
        <ul
          className={`list-disc pl-4 ${showRequirements ? "flex flex-col opacity-100" : "hidden opacity-0"}`}
        >
          <li
            className={
              meetsRequirements.minLength ? "text-green-500" : "text-red-500"
            }
          >
            8 characters
          </li>
          <li
            className={
              meetsRequirements.specialChar ? "text-green-500" : "text-red-500"
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
      <input ref={hiddenTokenRef} type="hidden" name="securityToken" />{" "}
      {/* Hidden input for security token */}
      <Btn content={loading ? <Loader /> : "Sign Up"} styles="bg-primary" />
      <span className="px-2 py-1 text-sm">
        Already have an account?{" "}
        <Link className="underline" href={"/sign-in"}>
          Click here
        </Link>
      </span>
    </form>
  );
}

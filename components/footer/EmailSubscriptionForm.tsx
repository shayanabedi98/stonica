"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { LuLoader } from "react-icons/lu";

export default function EmailSubscriptionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.email.trim() !== "") {
      setIsLoading(true);
      try {
        const res = await fetch("/api/email-subscription", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ formData }),
        });

        const data = await res.json();
        if (res.ok) {
          toast.success("Subscribed!");
          setFormData({
            email: "",
          });
        } else if (data.error === "Already exists") {
          toast.error("This email is already subscribed");
        } else {
          toast.error("Failed to subscribe. Try again.");
        }
      } catch (error) {
        toast.error("Something went wrong, try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form className="flex min-w-72 flex-col gap-2" onSubmit={handleSubmit}>
      <label className="max-w-72 text-2xl font-thin">
        Subscribe to Receive Updates &amp; Offers!
      </label>
      <div className="relative mb-6">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
          <svg
            className="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 16"
          >
            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
          </svg>
        </div>
        <div className="flex gap-2">
          <input
            required
            type="email"
            id="input-group-1"
            className="dark:placeholder-gray-40 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="joe@email.com"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
          <button
            type="submit"
            className="flex min-w-24 items-center justify-center rounded-lg bg-color1 px-3 text-sm font-semibold transition lg:hover:bg-opacity-80"
          >
            {isLoading ? <LuLoader className="loading text-xl" /> : "Subscribe"}
          </button>
        </div>
      </div>
    </form>
  );
}

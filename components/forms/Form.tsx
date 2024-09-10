"use client";

import { useState } from "react";
import Input from "./Input";

export default function Forms() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("missing fields");
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
        alert("success");
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h2></h2>
      <form className="form flex flex-col gap-3" onSubmit={handleSubmit}>
        <Input name="name" label="Name" type="text" onChange={handleChange} />
        <Input
          name="email"
          label="Email"
          type="email"
          onChange={handleChange}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

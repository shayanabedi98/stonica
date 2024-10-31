"use client";

import { useEffect, useState } from "react";
import Card from "../products/Card";
import LoadingCard from "./LoadingCard";
import { Product, User } from "@/types";

type Props = {
  signedInUser?: User | null;
};

export default function ProductsList({ signedInUser }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/post", { method: "GET" });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <LoadingCard />;
  }

  return (
    <div className="grid grid-cols-3 justify-items-center gap-10">
      {products.map((product, index) => (
        <Card
          user={product.User as User}
          signedInUser={signedInUser}
          key={index}
          formData={product}
        />
      ))}
    </div>
  );
}

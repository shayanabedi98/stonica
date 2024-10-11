"use client";

import { useEffect, useState } from "react";
import Card from "../posts/Card";
import { Product, User } from "@/types";

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/post", { method: "GET" });
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {products && (
        <div className="grid grid-cols-3 justify-items-center gap-10">
          {products.map((product, index) => (
            <Card user={product.User as User} key={index} formData={product} />
          ))}
        </div>
      )}
    </div>
  );
}

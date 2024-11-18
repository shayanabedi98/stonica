"use client";

import { FilterOptions, User } from "@/types";
import { Filter } from "./Filter";
import ProductsList from "./ProductsList";
import { useEffect, useState } from "react";

type Props = {
  signedInUser: User;
};

export default function ProductsPageContainer({ signedInUser }: Props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    minPriceRange: 100,
    maxPriceRange: 10000,
    stoneType: [],
    textureType: [],
    colors: ["None", "None", "None"],
    veins: null,
    bookmatched: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/post", { method: "GET" });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  function handleFilterChange(
    name: string,
    value: string | boolean | number,
    itemValue?: string,
  ) {
    if (name === "stoneType" || name === "textureType") {
      setFilterOptions((prev) => {
        const currentArray = prev[name] as string[];
        if (value && itemValue) {
          // Add item if it doesn't exist
          return {
            ...prev,
            [name]: currentArray.includes(itemValue)
              ? currentArray
              : [...currentArray, itemValue],
          };
        } else {
          // Remove item
          return {
            ...prev,
            [name]: currentArray.filter((item) => item !== itemValue),
          };
        }
      });
    } else {
      // Handle non-array values (like price ranges)
      setFilterOptions((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  function handleColorChange(index: number, value: string) {
    setFilterOptions((prev) => ({
      ...prev,
      colors: prev.colors.map((color, _index) =>
        _index === index ? value : color,
      ),
    }));
  }

  return (
    <div className="relative grid grid-cols-4 gap-10 px-10">
      <div className="relative col-span-1">
        <Filter
          filterOptions={filterOptions}
          handleColorChange={handleColorChange}
          handleFilterChange={handleFilterChange}
        />
      </div>
      <div className="col-span-3 place-self-start">
        <ProductsList
          signedInUser={signedInUser}
          productsData={products}
          loading={loading}
        />
      </div>
    </div>
  );
}

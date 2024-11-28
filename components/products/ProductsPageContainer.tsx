"use client";

import { FilterOptions, User } from "@/types";
import { Filter } from "./Filter";
import ProductsList from "./ProductsList";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatPrice } from "@/utils/formatPrice";

type Props = {
  signedInUser: User;
};

export default function ProductsPageContainer({ signedInUser }: Props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    minPriceRange: "100",
    maxPriceRange: "10000",
    stoneType: [],
    textureType: [],
    baseColor: "- Select -",
    veinColor: "- Select -",
    secondaryColor: "- Select -",
    veins: "- Select -",
    bookmatched: "- Select -",
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

  async function handleClearFilter() {
    setLoading(true);
    try {
      const res = await fetch("/api/post", { method: "GET" });
      const data = await res.json();
      setProducts(data);
      setFilterOptions({
        minPriceRange: "100",
        maxPriceRange: "10000",
        stoneType: [],
        textureType: [],
        baseColor: "- Select -",
        veinColor: "- Select -",
        secondaryColor: "- Select -",
        veins: "- Select -",
        bookmatched: "- Select -",
      });
    } catch (error) {
      toast.error("Something went wrong, try again later");
    } finally {
      setLoading(false);
    }
  }

  // function handleRemoveFilters() {}
  async function handleSubmitFilters(e: React.FormEvent) {
    e.preventDefault();
    if (
      parseFloat(filterOptions.minPriceRange) >
      parseFloat(filterOptions.maxPriceRange)
    ) {
      toast.error(
        `Maximum price cannot be lower than ${formatPrice(parseFloat(filterOptions.minPriceRange))}`,
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/post/filter", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ filterOptions }),
      });
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      toast.error("Something went wrong, try again later");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative grid grid-cols-4 gap-10 px-10">
      <div className="relative col-span-1">
        <Filter
          handleClearFilter={handleClearFilter}
          handleSubmitFilters={handleSubmitFilters}
          filterOptions={filterOptions}
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

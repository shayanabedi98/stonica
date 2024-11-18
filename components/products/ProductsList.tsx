"use client";

import Card from "../products/Card";
import LoadingCard from "./LoadingCard";
import { Product, User } from "@/types";

type Props = {
  productsData?: Product[] | null;
  signedInUser?: User;
  loading: boolean;
};

export default function ProductsList({
  productsData,
  signedInUser,
  loading,
}: Props) {
  return (
    <div className="grid w-full grid-cols-3 justify-items-center gap-12">
      {loading && <LoadingCard style="loading-card" />}
      {loading && <LoadingCard style="loading-card" />}
      {loading && <LoadingCard style="loading-card" />}
      {!loading &&
        productsData?.map((product, index) => (
          <Card signedInUser={signedInUser} key={index} formData={product} />
        ))}
    </div>
  );
}

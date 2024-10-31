import { Product } from "@/types";

export default function ProductDescription({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-2">
      <h2>{product.title}</h2>
      <div className="flex gap-2">
        <h3>{product.price}</h3>
      </div>
    </div>
  );
}

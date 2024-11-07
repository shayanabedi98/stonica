import { Product } from "@/types";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function ProductDescription({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-8">
      <h2>{product.title}</h2>
      <div className="flex flex-col gap-2">
        <h3>{formatPrice(parseInt(product.price))}</h3>
        <p className="flex w-28 items-center justify-center rounded-lg bg-color3 p-1 text-sm font-semibold text-primary">
          In Stock: {product.qty}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h3>Contact</h3>
        <Link
          href={`/vendor/${product?.User?.id}`}
          className="flex items-center gap-2"
        >
          <Image
            src={product.User?.image || ""}
            alt="Vendor's company logo"
            width={36}
            height={36}
            className="rounded-full"
          />
          <p className="cursor-pointer font-semibold">
            {product.User?.companyName}
          </p>
        </Link>
        <div className="flex items-center gap-2">
          <FaPhoneAlt />
          <p>{product.User?.phone}</p>
        </div>
        <div className="flex items-center gap-2">
          <MdEmail />
          <p>{product.User?.email}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p>
          <strong>Stone Type:</strong> {product.type}
        </p>
        <p>
          <strong>Texture:</strong> {product.textureType}
        </p>
        <p>
          <strong>Colors:</strong> {product.colors?.map((i) => `${i}, `)}
        </p>
        <p>
          <strong>Veins:</strong> {product.veins}
        </p>
        <p>
          <strong>Bookmatched:</strong> {product.bookmatched}
        </p>
        <p>
          <strong>Dimensions:</strong> {product.width} inches x {product.height}{" "}
          inches
        </p>
      </div>
    </div>
  );
}

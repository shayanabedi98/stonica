import Image from "next/image";

export default function Card({
  price,
  src,
  alt,
  qty,
  title,
  marble,
  color,
}: any) {
  return (
    <div className="flex flex-col items-center">
      <h2>{title}</h2>
      <p>
        {marble}, {color}
      </p>
      <Image src={src} alt={alt} height={700} width={700} />
      <div className="flex flex-col gap-3">
        <div className="justify-between">
          <p>Price:</p>
          <p>{price}</p>
        </div>
        <div className="justify-between">
          <p>Quantity:</p>
          <p>{qty}</p>
        </div>
      </div>
    </div>
  );
}

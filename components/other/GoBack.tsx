import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function GoBack({
  href,
  content,
}: {
  href: string;
  content: string;
}) {
  return (
    <div className="absolute mt-4 flex min-w-36 items-center gap-2 pr-2">
      <Link href={href}>
        <FaArrowLeft className="h-10 w-10 rounded-full bg-secondary p-2 text-primary transition lg:hover:-translate-x-2 lg:hover:bg-gradient-to-br from-secondary to-accent" />
      </Link>
      <span className="font-semibold">{content}</span>
    </div>
  );
}

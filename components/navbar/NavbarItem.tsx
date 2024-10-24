"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  content: string;
};

export default function NavbarItem({ href, content }: Props) {
  const path = usePathname();

  return (
    <Link
      className={`${path == href ? "border-b" : ""} text-sm h-6 border-secondary lg:hover:text-accent transition`}
      href={href}
    >
      {content}
    </Link>
  );
}

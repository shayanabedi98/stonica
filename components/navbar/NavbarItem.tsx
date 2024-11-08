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
      className={`${path == href ? "border-b" : ""} h-6 border-color4 text-sm transition lg:hover:text-accent`}
      href={href}
    >
      {content}
    </Link>
  );
}

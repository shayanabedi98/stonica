"use client";

import Link from "next/link";
import NavbarItem from "./NavbarItem";
import { useSession } from "next-auth/react";
import Btn from "../Btn";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <header className="flex h-14 items-center justify-between px-6">
      <nav className="flex h-full items-end gap-10">
        <Link
          className="logo text-2xl font-semibold tracking-widest"
          href={"/"}
        >
          STONICA
        </Link>
        <div className="border-accent h-8 border-r"></div>
        <NavbarItem content="Home" href="/" />
        <NavbarItem content="Products" href="/products" />
        <NavbarItem content="About" href="/about" />
        <NavbarItem content="Contact" href="/contact" />
      </nav>
      <div className="flex h-full items-end">
        {session?.user ? (
          <div>
            <Image
              src={session.user.image || "/assets/avatar.png"}
              alt=""
              height={24}
              width={24}
            />
          </div>
        ) : (
          <Btn
            content="Vendor"
            onClick={() => router.push("/register")}
            styles="bg-primary border-2"
          />
        )}
      </div>
    </header>
  );
}

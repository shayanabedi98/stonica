"use client";

import Link from "next/link";
import NavbarItem from "./NavbarItem";
import { signOut } from "next-auth/react";
import Btn from "../Btn";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = {
  user?: {
    name: string;
    image: string | null;
  } | null;
  session: unknown;
};

export default function Navbar({ user, session }: Props) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();
  const userMenu = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (userMenu.current && !userMenu.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("click", closeMenu);
    }

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [showUserMenu]);

  return (
    <header className="flex h-14 items-center justify-between px-6">
      <nav className="flex h-full items-end gap-10">
        <Link
          className="logo text-2xl font-semibold tracking-widest"
          href={"/"}
        >
          STONICA
        </Link>
        <div className="h-8 border-r border-accent"></div>
        <NavbarItem content="Home" href="/" />
        <NavbarItem content="Products" href="/products" />
        <NavbarItem content="About" href="/about" />
        <NavbarItem content="Contact" href="/contact" />
      </nav>
      <div className="flex h-full items-end">
        {session && user ? (
          <div className="relative" ref={userMenu}>
            <Image
              onClick={() => setShowUserMenu(!showUserMenu)}
              src={user.image || "/assets/avatar.png"}
              alt="User profile picture"
              height={36}
              width={36}
              priority
              className="cursor-pointer rounded-sm border-2 border-neutral-400 bg-secondary transition duration-200 lg:hover:scale-110"
            />
            {showUserMenu && (
              <div className="absolute right-0 top-10 flex min-w-36 flex-col items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm text-primary">
                <span className="font-semibold">{user.name}</span>
                <hr className="w-full text-primary" />
                <Link
                  className="font-medium lg:hover:underline"
                  href={"/vendor/dashboard"}
                  onClick={() => setShowUserMenu(false)}
                >
                  Dashboard
                </Link>
                <Link
                  className="font-medium lg:hover:underline"
                  href={"/vendor/settings"}
                  onClick={() => setShowUserMenu(false)}
                >
                  Settings
                </Link>
                <Btn
                  content={"Sign Out"}
                  onClick={() => signOut()}
                  styles="bg-primary text-secondary"
                />
              </div>
            )}
          </div>
        ) : (
          <Btn
            content="Vendor"
            onClick={() => router.push("/vendor/register")}
            styles="bg-primary border-2"
          />
        )}
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import NavbarItem from "./NavbarItem";
import { signOut } from "next-auth/react";
import Btn from "../Btn";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Container from "../Container";

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
  const path = usePathname();

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
    <header className="fixed z-30 flex h-20 w-full items-center justify-between bg-primary bg-opacity-80 text-secondary backdrop-blur-lg">
      <Container>
        <div className="flex h-20 w-full items-center justify-between">
          <nav className="flex h-full items-end gap-10 pb-4">
            <Link
              className="logo text-2xl font-semibold tracking-widest"
              href={"/"}
            >
              STONICA
            </Link>
            <NavbarItem content="Home" href="/" />
            <NavbarItem content="Products" href="/products" />
            <NavbarItem content="About" href="/about" />
            <NavbarItem content="Contact" href="/contact" />
          </nav>
          <div className="flex h-full items-end pb-4">
            {session && user ? (
              <div className="relative" ref={userMenu}>
                <Image
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  src={user.image || "/assets/avatar.png"}
                  alt="User profile picture"
                  height={40}
                  width={40}
                  priority
                  className={`cursor-pointer rounded-full border-2 border-secondary ${user.image ? "" : "bg-primary"} transition duration-200 lg:hover:scale-110`}
                />
                {showUserMenu && (
                  <div className="absolute right-0 top-12 flex min-w-36 flex-col items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm text-primary">
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
              path !== "/join" && (
                <Btn
                  content="Join"
                  onClick={() => router.push("/join")}
                  styles="bg-color1"
                />
              )
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}

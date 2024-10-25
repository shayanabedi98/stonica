import prisma from "@/lib/db";
import Navbar from "./Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function NavbarContainer() {
  const session = await getServerSession(authOptions);

  let user = null;

  if (session?.user?.email) {
    try {
      user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: {
          name: true,
          image: true,
          email: true,
          isVendor: true,
        },
      });
    } catch (error) {}
  }

  return session ? (
    <Navbar user={user} session={session} />
  ) : (
    <Navbar user={null} session={null} />
  );
}

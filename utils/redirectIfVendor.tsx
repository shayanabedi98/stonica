import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function redirectIfVendor() {
  const session = await getServerSession(authOptions);

  let user;

  try {
    user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });
  } catch (error) {
    user = null;
  }

  if (session && user?.isVendor) {
    redirect("/vendor/dashboard");
  }
}

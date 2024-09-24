import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function isSignedIn(
  accessibleBy: "vendor" | "any" | "shopper",
  page?: "sign-in",
) {
  const session = await getServerSession(authOptions);
  let user;

  try {
    user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });
  } catch (error) {
    user = null;
  }

  if (page !== "sign-in") {
    if (!user) {
      redirect("/sign-in");
    }
  }

  if (accessibleBy == "vendor") {
    if (user && !user?.isVendor) {
      redirect("/");
    }
  } else if (accessibleBy == "shopper") {
    if (user && user?.isVendor) {
      redirect("/vendor/dashboard");
    }
  } else if (accessibleBy == "any") {
    if (user && user?.isVendor) {
      redirect("/vendor/dashboard");
    } else if (user) {
      redirect("/");
    }
  }
}

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function isAccountSetup(
  page: "account-setup" | "dashboard",
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

  if (page == "dashboard") {
    if (!user?.companyName) {
      redirect("/vendor/account-setup");
    }
  } else if (page == "account-setup") {
    if (user?.companyName) {
      redirect("/vendor/dashboard");
    }
  }
}

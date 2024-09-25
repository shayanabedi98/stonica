import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

export default async function getAuthUser(
  select?: "select",
  selectObj?: { [K in keyof Prisma.UserSelect]: boolean },
) {
  const session = await getServerSession(authOptions);
  let user;

  if (!session || !session.user?.email) {
    return null;
  }

  if (select === "select") {
    try {
      user = await prisma.user.findUnique({
        where: { email: session?.user?.email as string },
        select: selectObj,
      });
    } catch (error) {
      user = null;
    }
  } else {
    try {
      user = await prisma.user.findUnique({
        where: { email: session?.user?.email as string },
      });
    } catch (error) {
      user = null;
      console.log(error);
    }
  }

  return user;
}

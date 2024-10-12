import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import getAuthUser from "@/utils/getAuthUser";

export async function POST(req: Request) {
  const user = await getAuthUser();
  const { id } = await req.json();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    if (user.wishlist.includes(id) == false) {
      try {
        const addToWishlist = await prisma.user.update({
          where: { email: user.email as string },
          data: {
            wishlist: {
              push: id,
            },
          },
        });
        return NextResponse.json(addToWishlist);
      } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Could not add to wishlist" });
      }
    } else {
      return NextResponse.json({ message: "Cannot add duplicates" });
    }
  }
}

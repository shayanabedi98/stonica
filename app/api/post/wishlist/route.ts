import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import getAuthUser from "@/utils/getAuthUser";

export async function POST(req: Request) {
  const user = await getAuthUser();
  0;
  const { id } = await req.json();
  const newWishlist = user?.wishlist.filter((item) => item != id);

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
        return NextResponse.json({
          message: "Added to Wishlist",
          addToWishlist,
        });
      } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Could not add to wishlist" });
      }
    } else if (user.wishlist.includes(id) == true) {
      try {
        const addToWishlist = await prisma.user.update({
          where: { email: user.email as string },
          data: {
            wishlist: newWishlist,
          },
        });
        return NextResponse.json({
          message: "Removed from Wishlist",
          addToWishlist,
        });
      } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Could not remove from wishlist" });
      }
    }
  }
}

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { formData, imageId } = await req.json();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    try {
      const getUser = await prisma.user.findUnique({
        where: { email: session.user?.email as string },
      });

      if (getUser) {
        const createPost = await prisma.post.create({
          data: {
            userId: getUser?.id,
            price: formData.price,
            salePrice: formData.salePrice,
            images: formData.images,
            qty: parseInt(formData.qty),
            title: formData.title,
            colors: formData.colors,
            width: formData.width,
            height: formData.height,
            type: formData.type,
            imageId,
          },
        });

        return NextResponse.json(createPost);
      }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Could not create new post" });
    }
  }
}

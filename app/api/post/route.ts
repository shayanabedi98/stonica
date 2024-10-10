import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { formData } = await req.json();

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
            veins: formData.veins,
            bookmatched: formData.bookmatched,
            title: formData.title,
            colors: formData.colors,
            width: formData.width,
            height: formData.height,
            type: formData.type,
            textureType: formData.textureType,
            imageId: formData.imageId,
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

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  const { formData, waitingForDelete } = await req.json();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    try {
      const getUser = await prisma.user.findUnique({
        where: { email: session.user?.email as string },
      });

      if (waitingForDelete.length > 0) {
        const deleteId = waitingForDelete.filter(
          (item: string) => formData.imageId.includes(item) == false,
        );

        for (let i = 0; i < deleteId.length; i++) {
          const fileId = deleteId[i];
          await fetch(`https://api.uploadcare.com/files/${fileId}/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Uploadcare.Simple ${process.env.UPLOAD_CARE_PUBLIC_KEY}:${process.env.UPLOAD_CARE_SECRET_KEY}`,
            },
          });
        }
      }

      if (getUser) {
        const createPost = await prisma.post.update({
          where: { id: formData.id },
          data: {
            userId: getUser?.id,
            price: formData.price,
            salePrice: formData.salePrice,
            images: formData.images,
            qty: parseInt(formData.qty),
            veins: formData.veins,
            bookmatched: formData.bookmatched,
            title: formData.title,
            colors: formData.colors,
            width: formData.width,
            height: formData.height,
            type: formData.type,
            textureType: formData.textureType,
            imageId: formData.imageId,
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

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  const { id, imageId } = await req.json(); // `id` is assumed to be an array

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    try {
      // Delete the post from the database
      const deletePost = await prisma.post.delete({
        where: { id },
      });

      // Call Uploadcare API to delete each file in the `id` array
      for (let i = 0; i < imageId.length; i++) {
        const fileId = imageId[i];
        await fetch(`https://api.uploadcare.com/files/${fileId}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Uploadcare.Simple ${process.env.UPLOAD_CARE_PUBLIC_KEY}:${process.env.UPLOAD_CARE_SECRET_KEY}`,
          },
        });
      }

      return NextResponse.json(deletePost);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Could not delete post or files" });
    }
  }
}

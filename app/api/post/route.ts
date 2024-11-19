import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import getAuthUser from "@/utils/getAuthUser";

export async function GET() {
  try {
    const getPosts = await prisma.post.findMany({
      include: { User: true },
    });
    return NextResponse.json(getPosts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not get products" });
  }
}

export async function POST(req: Request) {
  const getUser = await getAuthUser("select", { id: true });
  const { formData } = await req.json();

  if (!getUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    try {
      if (getUser) {
        const createPost = await prisma.post.create({
          data: {
            userId: getUser.id,
            price: parseFloat(formData.price),
            salePrice: parseFloat(formData.salePrice),
            images: formData.images,
            qty: parseInt(formData.qty),
            veins: formData.veins,
            bookmatched: formData.bookmatched,
            title: formData.title,
            baseColor: formData.baseColor,
            veinColor:
              formData.veinColor !== "- Select -" ? formData.veinColor : null,
            secondaryColor:
              formData.secondaryColor !== "- Select -"
                ? formData.secondaryColor
                : null,
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
            salePrice: formData.salePrice ? formData.salePrice : null,
            images: formData.images,
            qty: parseInt(formData.qty),
            veins: formData.veins,
            bookmatched: formData.bookmatched,
            title: formData.title,
            baseColor: formData.baseColor,
            veinColor:
              formData.veinColor !== "- Select -" ? formData.veinColor : null,
            secondaryColor:
              formData.secondaryColor !== "- Select -"
                ? formData.secondaryColor
                : null,
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

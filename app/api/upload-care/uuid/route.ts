import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE() {
  const uploadCareUuidList = [];
  const allImageIdsUsed: string[] = [];
  const apiUrl = "https://api.uploadcare.com/files/";

  try {
    const res = await fetch(`${apiUrl}`, {
      headers: {
        Authorization: `Uploadcare.Simple ${process.env.UPLOAD_CARE_PUBLIC_KEY}:${process.env.UPLOAD_CARE_SECRET_KEY}`,
        "Cache-Control": "no-store",
      },
    });

    const data = await res.json();
    for (const i of data.results) {
      uploadCareUuidList.push(i.uuid);
    }

    const allPosts = await prisma.post.findMany({
      select: { imageId: true },
    });
    const allUser = await prisma.user.findMany({
      select: { imageId: true },
    });

    for (const i of allUser) {
      if (i.imageId !== null) {
        allImageIdsUsed.push(i.imageId);
      }
    }

    for (const i of allPosts) {
      for (const j in i.imageId) {
        if (j !== null) {
          allImageIdsUsed.push(i.imageId[j]);
        }
      }
    }

    const deletePromise = uploadCareUuidList.filter(
      (uuid) => !allImageIdsUsed.includes(uuid),
    );

    for (const uuid in deletePromise) {
      try {
        await fetch(
          `https://api.uploadcare.com/files/${deletePromise[uuid]}/`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Uploadcare.Simple ${process.env.UPLOAD_CARE_PUBLIC_KEY}:${process.env.UPLOAD_CARE_SECRET_KEY}`,
            },
          },
        );
      } catch (error) {
        console.log(`error trying to delete uuid: ${deletePromise[uuid]}`, error);
      }
    }

    console.log(deletePromise);
    
    return NextResponse.json(deletePromise);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
}

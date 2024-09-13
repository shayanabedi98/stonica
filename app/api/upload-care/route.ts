import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  const { id } = await req.json();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    try {
      const res = await fetch(`https://api.uploadcare.com/files/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Uploadcare.Simple ${process.env.UPLOAD_CARE_PUBLIC_KEY}:${process.env.UPLOAD_CARE_SECRET_KEY}`,
        },
      });
      return NextResponse.json(res);
    } catch (error) {
      console.log(error);
      return NextResponse.json({
        message: "Could not remove image from upload care",
      });
    }
  }
}

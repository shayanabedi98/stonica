import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const { formData } = await req.json();
  const {
    name,
    email,
    phone,
    companyName,
    street,
    city,
    aptNum,
    stateProvince,
    zipPostalCode,
  } = formData;

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    try {
      const updateUserInfo = await prisma.user.update({
        where: { email: session.user?.email as string },
        data: {
          name,
          email,
          phone,
          companyName,
          street,
          city,
          aptNum : aptNum ? aptNum : null,
          stateProvince,
          zipPostalCode,
        },
      });
      return NextResponse.json(updateUserInfo);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Could not update user info" });
    }
  }
}

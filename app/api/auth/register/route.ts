import prisma from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { formData } = await req.json();
  const { name, email, password, userType } = formData;

  const hashedPassword = await hash(password, 10);

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }

    const createUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        hashedPassword,
        isAdmin: false,
        isVendor: userType == "vendor" ? true : false,
      },
    });
    return NextResponse.json(createUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "something went wrong" });
  }
}

import prisma from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { formData, securityToken } = await req.json();
  const { name, email, password, userType } = formData;

  const hashedPassword = await hash(password, 10);

  if (!securityToken || securityToken.length < 10) {
    return NextResponse.json(
      { message: "Invalid security token" },
      { status: 403 },
    );
  }

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

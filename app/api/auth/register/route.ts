import prisma from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { formData } = await req.json();
  const { name, email, password } = formData;

  const hashedPassword = await hash(password, 10);

  try {
    const createUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        isAdmin: false,
      },
    });
    return NextResponse.json(createUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "something went wrong" });
  }
}

import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { formData } = await req.json();

  try {
    const findEmail = await prisma.emailSubscriber.findFirst({
      where: { email: formData.email },
    });

    if (findEmail) {
      return NextResponse.json({ error: "Already exists" }, {status: 400});
    } else {
      const addToEmailSubscription = await prisma.emailSubscriber.create({
        data: {
          email: formData.email,
        },
      });
      return NextResponse.json(addToEmailSubscription);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not add to subscriptions" });
  }
}

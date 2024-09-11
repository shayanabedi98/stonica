import { generateResetToken } from "@/lib/auth";
import prisma from "@/lib/db";
import { sendResetPasswordEmail } from "@/lib/email";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { formData } = await req.json();
    const user = await prisma.user.findUnique({
      where: { email: formData.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!user.hashedPassword) {
      return NextResponse.json(
        {
          message:
            "This account uses Google Sign-In. Please use Google to sign in.",
        },
        { status: 400 },
      );
    }
    const resetToken = generateResetToken();
    const resetTokenExpiry = new Date(Date.now() + 3600000);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    await sendResetPasswordEmail(user.email!, resetToken);

    return NextResponse.json({ message: "Reset email sent" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

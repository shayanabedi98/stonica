import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Btn from "@/components/Btn";
import Container from "@/components/Container";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaCheck } from "react-icons/fa";

export default async function Register() {
  const session = await getServerSession(authOptions);

  let user;

  try {
    user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });
  } catch (error) {
    user = null;
  }

  if (session && user?.isVendor) {
    redirect("/vendor/dashboard");
  }

  const whatsIncluded = [
    "Make unlimited posts of your stone slabs",
    "Import images of your stones",
    "Set prices for each stone slab",
    "Manage and update your inventory easily",
    "Provide your contact information for customer inquiries",
    "Receive direct customer inquiries through our platform",
    "Cancel your subscription at any time",
  ];

  return (
    <div className="ancestor-container">
      <Container>
        <div className="flex items-center justify-center gap-32">
          <div className="bg flex max-w-96 flex-col items-center justify-center gap-4 rounded-md border-2 border-neutral-400 bg-gradient-to-b from-primary via-primary to-neutral-800 px-6 py-8 shadow-lg">
            <p className="text-2xl font-bold">Vendor Plan</p>
            <p className="text-5xl font-extrabold">$53.99 CAD</p>
            <p className="font-semibold">/month</p>
            <p className="text-center">
              Make your stone collection visible to users as a vendor. You
              handle your inventory, we&apos;ll handle the marketing.
            </p>
            <Link href={"/vendor/register"} className="w-full">
              <Btn content={"Get Started"} styles="bg-secondary w-full" />
            </Link>
            <hr className="my-2 w-full" />
            <ul className="flex w-full flex-col justify-center gap-3">
              {whatsIncluded.map((item, index) => (
                <li className="flex items-start gap-3 font-medium" key={index}>
                  <FaCheck className="relative top-[3px] text-xl text-green-500" />{" "}
                  <span className="w-full">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className=""></div> */}
        </div>
      </Container>
    </div>
  );
}

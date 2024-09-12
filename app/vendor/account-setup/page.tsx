import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Container from "@/components/Container";
import AccountSetupForm from "@/components/forms/AccountSetupForm";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AccountSetup() {
  const session = await getServerSession(authOptions);
  let user;
  if (!session) {
    redirect("/sign-in");
  } else {
    try {
      user = await prisma.user.findUnique({
        where: { email: session?.user?.email as string },
        select: {
          name: true,
          email: true,
          phone: true,
          companyName: true,
          latitude: true,
          longitude: true,
          street: true,
          aptNum: true,
          city: true,
          stateProvince: true,
          zipPostalCode: true,
          image: true,
        },
      });
    } catch (error) {
      console.log("failed to get user from db: " + error);
    }
  }

  if (user?.companyName) {
    redirect("/vendor/dashboard");
  }

  return (
    <div className="ancestor-container">
      <Container>
        <div>
          <h1 className="text-center">Account Setup</h1>
          <h3 className="mt-10 text-center">
            Feel free to change any information needed
          </h3>
          <div className="mx-auto mt-20 flex max-w-[420px] items-center justify-center rounded-sm border-2 px-4 py-6">
            {user && session && <AccountSetupForm existingUserData={user} />}
          </div>
        </div>
      </Container>
    </div>
  );
}

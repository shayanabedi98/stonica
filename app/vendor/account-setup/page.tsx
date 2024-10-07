import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Container from "@/components/Container";
import AccountSetupForm from "@/components/forms/AccountSetupForm";
import prisma from "@/lib/db";
import isAccountSetup from "@/utils/isAccountSetup";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AccountSetup() {
  await isAccountSetup("account-setup");

  const session = await getServerSession(authOptions);
  const pubKey = process.env.UPLOAD_CARE_PUBLIC_KEY;
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
          instagram: true,
          facebook: true,
          website: true
        },
      });
    } catch (error) {
      console.log("failed to get user from db: " + error);
    }
  }

  return (
    <div className="ancestor-container">
      <Container>
        <div>
          <h1 className="text-center mb-10">Account Setup</h1>
          <h3 className="mb-10-10 text-center">
            Feel free to change any information needed
          </h3>
          <div className="flex items-center justify-center rounded-sm px-4 py-6">
            {user && session && (
              <AccountSetupForm existingUserData={user} pubKey={pubKey!} />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Container from "@/components/Container";
// import EmergencySignOut from "@/components/other/EmergencySignOut";
import prisma from "@/lib/db";
import isAccountSetup from "@/utils/isAccountSetup";
import isSignedIn from "@/utils/isSignedIn";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  await isSignedIn("vendor");
  await isAccountSetup("dashboard")
  const session = await getServerSession(authOptions);
  let user;

  try {
    user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });
    if (!user?.companyName || !user?.latitude || !user?.longitude) {
      redirect("/vendor/account-setup");
    }
  } catch (error) {
    console.log("failed to get user from db: " + error);
  }

  return (
    <div className="ancestor-container">
      <Container>
        <div>
          <h1>Hello, {user?.name}!</h1>
          {/* <EmergencySignOut /> */}
        </div>
      </Container>
    </div>
  );
}

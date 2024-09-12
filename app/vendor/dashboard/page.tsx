import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Container from "@/components/Container";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  let user;

  try {
    user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });
  } catch (error) {
    console.log("failed to get user from db: " + error);
  }

  if (!user?.companyName || !user?.latitude || !user?.longitude ||!user.city) {
    redirect("/vendor/account-setup");
  }
  return (
    <div className="ancestor-container">
      <Container>
        <div>
          <h1>Hello, {user?.name}!</h1>
          <h2></h2>
        </div>
      </Container>
    </div>
  );
}

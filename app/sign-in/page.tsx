import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Container from "@/components/Container";
import SignInForm from "@/components/forms/SignInForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/vendor/dashboard");
  }

  return (
    <div className="ancestor-container">
      <Container>
        <div className="flex flex-col items-center">
          <h1 className="mb-20">Sign In</h1>
          <SignInForm />
        </div>
      </Container>
    </div>
  );
}

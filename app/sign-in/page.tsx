import Container from "@/components/Container";
import SignInForm from "@/components/forms/SignInForm";
import isSignedIn from "@/utils/isSignedIn";

export default async function SignIn() {
  await isSignedIn("any", "sign-in");

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

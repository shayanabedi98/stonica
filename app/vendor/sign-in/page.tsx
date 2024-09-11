import Container from "@/components/Container";
import SignInForm from "@/components/forms/SignInForm";

export default function SignIn() {
  return (
    <div className="ancestor-container">
      <Container>
        <div className="flex flex-col items-center">
          <h1>Sign In</h1>
          <SignInForm />
        </div>
      </Container>
    </div>
  );
}

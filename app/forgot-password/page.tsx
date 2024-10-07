import Container from "@/components/Container";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <div className="ancestor-container">
      <Container>
        <div className="flex flex-col items-center">
          <h1 className="mb-10">Forgot Password</h1>
          <h3 className="mb-10 text-center">
            It&apos;s okay, it happens to the best of us
          </h3>
          <ForgotPasswordForm />
        </div>
      </Container>
    </div>
  );
}

import Container from "@/components/Container";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <div className="ancestor-container">
      <Container>
        <div className="flex flex-col items-center">
          <h3 className="self-center">
            It&apos;s okay, it happens to the best of us
          </h3>
          <ForgotPasswordForm />
        </div>
      </Container>
    </div>
  );
}

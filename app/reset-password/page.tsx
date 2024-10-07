import Container from "@/components/Container";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div className="ancestor-container">
      <Container>
        <div className="flex flex-col items-center">
          <h1 className="mb-20">Reset password</h1>
          <ResetPasswordForm />
        </div>
      </Container>
    </div>
  );
}

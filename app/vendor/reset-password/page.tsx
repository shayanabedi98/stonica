import Container from "@/components/Container";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div className="ancestor-container">
      <Container>
        <div className="flex flex-col items-center">
          <h3 className="self-center"></h3>
          <ResetPasswordForm />
        </div>
      </Container>
    </div>
  );
}

import Container from "@/components/Container";
import SignUpForm from "@/components/forms/SignUpForm";
import redirectIfVendor from "@/utils/redirectIfVendor";

export default async function Register() {
  await redirectIfVendor();

  return (
    <div className="ancestor-container">
      <Container>
        <SignUpForm />
      </Container>
    </div>
  );
}

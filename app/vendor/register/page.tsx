import Container from "@/components/Container";
import SignUpForm from "@/components/forms/SignUpForm";
import isSignedIn from "@/utils/isSignedIn";

export default async function VendorRegister() {
  await isSignedIn("any")

  return (
    <div className="ancestor-container">
      <h1 className="text-center mb-20">Glad you&apos;d want to join us</h1>
      <Container>
        <SignUpForm userType="vendor" />
      </Container>
    </div>
  );
}

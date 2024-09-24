import Container from "@/components/Container";
import SignUpForm from "@/components/forms/SignUpForm";
import isSignedIn from "@/utils/isSignedIn";

export default async function ShopperRegister() {
  await isSignedIn("any");

  return (
    <div className="ancestor-container">
      <h1 className="mb-20 text-center">Glad you&apos;d want to join us</h1>
      <Container>
        <SignUpForm userType="shopper" />
      </Container>
    </div>
  );
}

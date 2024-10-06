import Container from "@/components/Container";
import SignUpForm from "@/components/forms/SignUpForm";
import isSignedIn from "@/utils/isSignedIn";

export default async function ShopperRegister() {
  await isSignedIn("any");

  return (
    <div className="ancestor-container">
      <Container>
        <div className="flex flex-col items-center">
          <h1 className="mb-20">Glad you&apos;d want to join us!</h1>
          <SignUpForm userType="shopper" />
        </div>
      </Container>
    </div>
  );
}

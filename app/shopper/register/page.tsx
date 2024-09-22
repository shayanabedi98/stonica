import Container from "@/components/Container";
import SignUpForm from "@/components/forms/SignUpForm";
import redirectIfVendor from "@/utils/redirectIfVendor";

export default async function ShopperRegister() {
  await redirectIfVendor();

  return (
    <div className="ancestor-container">
      <h1 className="text-center mb-20">Glad you&apos;d want to join us</h1>
      <Container>
        <SignUpForm userType="shopper" />
      </Container>
    </div>
  );
}

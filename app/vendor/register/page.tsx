import Container from "@/components/Container";
import SignUpForm from "@/components/forms/SignUpForm";
import Image from "next/image";

export default function Register() {
  return (
    <div className="ancestor-container">
      <Container>
        <div className="flex items-center justify-center">
          <div className="flex w-1/2 flex-col justify-center gap-8 px-10">
            <h1>Become a Vendor</h1>
            <h2>
              Make your stone collection visible to users as a{" "}
              <strong>Vendor</strong>. Gain access to our services for a fee of
              $53.99/month. You handle your inventory, we&apos;ll handle the
              marketing.
            </h2>
            <p>As a vendor you can:</p>
            <ul className="list-disc pl-8">
              <li>Make unlimited posts of your stone slabs</li>
              <li>Import images of your stones</li>
              <li>Set prices for each stone slab</li>
              <li>Manage and update your inventory easily</li>
              <li>Provide your contact information for customer inquiries</li>
              <li>Receive direct customer inquiries through our platform</li>
              <li>Cancel your subscription at any time</li>
            </ul>
          </div>
          <div className="relative flex h-full w-1/2 items-center justify-center">
            <Image
              src={"/assets/red-stone.webp"}
              width={1000}
              height={1000}
              alt="Black marble stone slab"
              className="aspect-square object-cover"
              quality={100}
            />
          </div>
        </div>
        <div className="">
          <SignUpForm />
        </div>
      </Container>
    </div>
  );
}

import Btn from "@/components/Btn";
import Container from "@/components/Container";
import Card from "@/components/posts/Card";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";

export default async function Vendor() {

  const whatsIncluded = [
    "Make unlimited posts of your stone slabs",
    "Import images of your stones",
    "Set prices for each stone slab",
    "Manage and update your inventory easily",
    "Provide your contact information for customer inquiries",
    "Receive direct customer inquiries through our platform",
    "Cancel your subscription at any time",
  ];

  const images = [
    [
      "/assets/example-stones/1.jpeg",
      "/assets/example-stones/2.jpeg",
      "/assets/example-stones/3.jpeg",
    ],
    [
      "/assets/example-stones/4.jpeg",
      "/assets/example-stones/5.jpeg",
      "/assets/example-stones/6.jpeg",
    ],
    [
      "/assets/example-stones/7.jpeg",
      "/assets/example-stones/8.jpeg",
    ],
  ];

  return (
    <div className="ancestor-container">
      <Container>
        <div className="flex w-full flex-col">
          <div className="mt-20 flex items-stretch justify-center gap-20">
            <div className="flex w-1/2 max-w-96 flex-col items-center justify-center gap-4 rounded-md bg-gradient-to-b from-secondary via-neutral-100 to-neutral-300 px-6 py-8 text-primary">
              <p className="text-2xl font-bold">Vendor Plan</p>
              <p className="text-5xl font-extrabold">$53.99 CAD</p>
              <p className="font-semibold">/month</p>
              <p className="text-center">
                Make your stone collection visible to users as a vendor. You
                handle your inventory, we&apos;ll handle the marketing.
              </p>
              <Link href={"/vendor/register"} className="w-full">
                <Btn
                  content={"Get Started"}
                  styles="bg-primary text-secondary w-full"
                />
              </Link>
              <ul className="flex w-full flex-col justify-center gap-2">
                {whatsIncluded.map((item, index) => (
                  <li
                    className="flex items-start gap-3 font-medium"
                    key={index}
                  >
                    <FaCheck className="relative top-[3px] text-xl text-green-500" />{" "}
                    <span className="w-full">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex w-1/2 flex-col items-center justify-center gap-6">
              <h1>Display Your Inventory</h1>
              <h2>
                Manage up to 40 stone listings with ease, update stock in
                real-time, and set custom prices per slab.
              </h2>
              <p>
                As a Stonica Vendor, you gain exclusive access to a
                comprehensive suite of tools designed to help you manage your
                inventory and reach a broader audience of potential buyers. Our
                platform is optimized to showcase your unique stone slabs in the
                best light, attracting both retail customers and larger
                contractors looking for high-quality materials.
              </p>
              <p>
                Receive direct inquiries, customize your contact info, and use{" "}
                AI-powered recommendations to boost sales.
              </p>
            </div>
          </div>
          <div className="mt-32 flex w-full flex-col items-center justify-center gap-6">
            <h3>Preview</h3>
            <div className="flex gap-16">
              <Card
                companyName="Your Company Name"
                title={"Black Desert"}
                images={images[0]}
                color="Black"
                qty={6}
                price={1400.0}
                type="Onyx"
                tel="555-555-5555"
              />
              <Card
                companyName="Your Company Name"
                title={"Blanco Criste"}
                images={images[2]}
                color="White"
                qty={8}
                price={1100.00}
                type="Marble"
                tel="555-555-5555"
              />
              <Card
                companyName="Your Company Name"
                title={"Red Desire"}
                images={images[1]}
                color="Red"
                qty={11}
                price={1900.0}
                type="Onyx"
                tel="555-555-5555"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

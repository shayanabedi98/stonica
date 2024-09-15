import Container from "@/components/Container";
import CTA from "@/components/join/CTA";
import Image from "next/image";
import { MdSell } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import Link from "next/link";
import Btn from "@/components/Btn";

export default function Join() {
  return (
    <div>
      <div className="ancestor-container">
        <Container>
          <div className="flex items-center gap-4">
            <div className="flex w-1/2 flex-col items-start gap-8">
              <h1>Become a valued member</h1>
              <h2 className="w-[95%]">
                Sign up to be a part of this growing community either as a
                vendor or shopper.
              </h2>
            </div>
            <div className="flex w-1/2 justify-end">
              <Image
                src={"/assets/red-stone.webp"}
                alt=""
                className="aspect-square w-[700px] transform rounded-md object-cover shadow-lg"
                height={1000}
                width={1000}
                priority
                quality={100}
              />
            </div>
          </div>
        </Container>
      </div>
      <div className="ancestor-container bg-secondary">
        <Container>
          <div className="flex items-center justify-center bg-primary">
            <div className="w-full text-center xl:border-r-2">
              <CTA
                icon={<FaShoppingBag />}
                content="Shopper Sign up"
                href="/shopper/register"
                description="Join Stonica to explore and favorite your favorite stones! Sign up to create a personalized list of stones you love and receive exclusive updates on new features and products directly to your inbox. Discover unique stone collections and elevate your next project with the finest materials."
                heading="Become a Shopper"
              />
            </div>
            <div className="w-full bg-red-500 text-center xl:border-l-2">
              <CTA
                icon={<MdSell />}
                content="Vendor Sign up"
                href="/vendor/register"
                description="Become a vendor on Stonica for just $53.99 CAD/month and showcase your stone inventory to a growing audience. With your own admin portal, you can easily create posts, manage your listings, and reach potential customers looking for premium stone slabs."
                heading="Become a Vendor"
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center mt-1 gap-4 bg-primary py-6">
            <h3>Already have an account?</h3>
            <Link href={"/sign-in"}>
              <Btn content={"Sign in"} styles="min-w-44" />
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}

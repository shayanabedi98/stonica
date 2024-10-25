import Btn from "@/components/Btn";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";

type ProcessCardType = {
  image: string;
  description: string;
  title: string;
  styles: string;
};

const InfoCard = ({ styles, image, description, title }: ProcessCardType) => {
  return (
    <div className={`w-full ${styles}`}>
      <Container>
        <div
          className={`${styles} flex min-h-96 w-full items-center justify-center gap-10 rounded-md py-10 text-primary`}
        >
          <div className="flex w-1/2 flex-col justify-center gap-4">
            <span className="text-4xl font-bold">{title}</span>
            <span>{description}</span>
          </div>
          <div className="relative h-[480px] w-1/2 rounded-md text-5xl">
            <Image src={image} alt="" fill className="object-cover" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default function Home() {
  return (
    <div className="ancestor-container-home flex flex-col gap-36">
      <div className="screen-sized-image home-hero-bg relative w-full">
        <Image
          src={"/assets/home/hero-gradient.png"}
          alt=""
          fill
          quality={100}
          className="object-cover"
        />
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-0">
          <Container>
            <div className="flex h-full w-full items-center justify-center gap-10 text-secondary">
              <div className="flex h-full w-1/2 flex-col items-center justify-center gap-6">
                <h1 className="home-header">Finding Stones Made Easy</h1>
                <p className="font-semibold">
                  Welcome to the hub of stones, where you can find the perfect
                  set for your next project. Connect with top suppliers, explore
                  a wide variety of stone slabs, and simplify your search today!
                </p>
                <div className="flex items-center gap-4 self-start">
                  <Link href={"/products"}>
                    <Btn content="Shop" styles="bg-color1" />
                  </Link>
                  <Link href={"/vendor"}>
                    <Btn content="Sell" styles="bg-color2" />
                  </Link>
                </div>
              </div>
              <div className="relative h-[470px] w-1/2">
                <Image
                  src={"/assets/home/laptop.png"}
                  alt=""
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Container>
        <div>
          <div className="flex items-center gap-10">
            <div className="flex w-1/2 flex-col items-start gap-4">
              <h2>Discover the Timeless Beauty of Natural Stone</h2>
              <p className="font-semibold">
                Explore our curated selection of premium, high-quality natural
                stone products, ideal for elevating the aesthetic and
                functionality of your home or business. Whether you&apos;re
                looking for elegant countertops, stunning flooring, or unique
                decorative elements, find the perfect stone to match your style
                and bring your design vision to life.
              </p>
            </div>
            <div className="flex w-1/2 justify-end">
              <Image
                src={"/assets/yellow-stone.webp"}
                alt=""
                className="h-[450px] w-[700px] transform rounded-sm object-cover shadow-lg"
                height={1000}
                width={1000}
                priority
                quality={100}
              />
            </div>
          </div>
        </div>
      </Container>
      <div className="flex flex-col items-center justify-center gap-10">
        <h3 className="text-5xl font-semibold">How Stonica Works</h3>
        <div className="flex w-full flex-col items-center justify-center">
          <InfoCard
            title="Explore Stone Collections"
            description="Uncover a world of exquisite stone slabs, carefully curated from top suppliers across the industry. Whether you're searching for luxurious marble, durable granite, or stylish quartz, our collection offers something for every taste and project. Browse detailed images, explore a variety of colors and textures, and find the perfect stone to bring your design vision to life."
            image="/assets/home/illustrations/info-card1.png"
            styles="flex-row bg-color1"
          />
          <InfoCard
            title="Connect with Suppliers"
            description="Stonica bridges the gap between customers and stone suppliers, allowing you to engage directly with industry professionals. Compare offerings, discuss project requirements, and establish meaningful connections with verified suppliers near you. Get personalized quotes and make informed decisions with confidence as you work hand-in-hand with experts to source the best materials for your projects."
            image="/assets/home/illustrations/info-card2.png"
            styles="flex-row-reverse bg-color2"
          />
          <InfoCard
            title="Personalized Wishlist"
            description="Save time and streamline your selection process by creating a personalized wishlist of your favorite stones. Easily add any slab that catches your eye to your list and revisit them at any time. Whether you're still deciding on the perfect material or gathering options for multiple projects, your wishlist helps you stay organized and ensures you never lose track of the stones you love."
            image="/assets/home/illustrations/info-card3.png"
            styles="flex-row bg-color3"
          />
        </div>
      </div>
    </div>
  );
}

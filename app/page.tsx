import Btn from "@/components/Btn";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="ancestor-container-home flex flex-col gap-20">
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
                <div className="flex gap-4 self-start">
                  <Link href={"/products"}>
                    <Btn content="Shop" styles="bg-primary" />
                  </Link>
                  <Link href={"/vendor"}>
                    <Btn content="Sell" styles="bg-primary" />
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
              <h3>
                Explore our curated selection of premium, high-quality natural
                stone products, ideal for elevating the aesthetic and
                functionality of your home or business. Whether you&apos;re
                looking for elegant countertops, stunning flooring, or unique
                decorative elements, find the perfect stone to match your style
                and bring your design vision to life.
              </h3>
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
    </div>
  );
}

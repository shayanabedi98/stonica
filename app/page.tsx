import Btn from "@/components/Btn";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="ancestor-container-home flex flex-col gap-20">
      <div className="screen-sized-image relative w-full home-hero-bg">
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
                <h1 className="home-header">
                  Lorem ipsum dolor sit amet consectetur
                </h1>
                <p className="font-semibold">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dignissimos voluptatibus ullam laudantium ipsum
                </p>
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
        <div className="flex flex-col gap-20">
          <div className="flex items-center gap-4">
            <div className="flex w-1/2 flex-col items-start gap-8">
              <h1>Discover the Beauty of Stone</h1>
              <h2>
                Explore our selection of high-quality natural stone products,
                perfect for enhancing your home or business. Find the ideal
                stone to suit your style and bring your vision to life.
              </h2>
              <div className="flex items-center justify-center gap-4">
                <Link href={"/products"}>
                  <Btn content="Products" styles="bg-primary" />
                </Link>
                <Link href={"/contact"}>
                  <Btn content="Contact" styles="" />
                </Link>
              </div>
            </div>
            <div className="flex w-1/2 justify-end">
              <Image
                src={"/assets/yellow-stone.webp"}
                alt=""
                className="aspect-square w-[700px] transform rounded-md object-cover shadow-lg"
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

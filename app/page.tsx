import Btn from "@/components/Btn";
import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="ancestor-container-home flex flex-col gap-20">
      <div className="relative w-full screen-sized-image">
        <Image src={"/assets/home/3.webp"} alt="" fill quality={100} className="object-cover"/>
      </div>
      <Container>
        <div className="flex flex-col gap-20">
          <div className="flex items-center gap-4">
            <div className="flex w-1/2 flex-col items-start gap-8">
              <h1>Discover the Beauty of Stone</h1>
              <h2>
                Explore our wide selection of high-quality natural stone
                products for your home or business.
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

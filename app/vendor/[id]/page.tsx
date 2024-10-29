import Container from "@/components/Container";
import Map from "@/components/vendor/Map";
import prisma from "@/lib/db";
import Image from "next/image";

export default async function VendorProfile({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  let vendor;

  try {
    vendor = await prisma.user.findUnique({
      where: { id },
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="ancestor-container">
      <Container>
        <div className="flex flex-col items-center gap-2">
          <Image
            src={vendor?.image || "/assets/avatar.png"}
            alt={`${vendor?.companyName} stone supplier/vendor profile picture`}
            quality={100}
            height={400}
            width={400}
            className="rounded-full"
          />
          <h1>{vendor?.companyName}</h1>
          {vendor?.longitude && vendor.latitude && (
            <Map lat={vendor?.latitude} lng={vendor?.longitude} />
          )}
        </div>
      </Container>
    </div>
  );
}

import Container from "@/components/Container";
import prisma from "@/lib/db";

export default async function VendorProfile({ params }: { params: { id: string } }) {
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
        <h1>{vendor?.companyName}</h1>
      </Container>
    </div>
  );
}

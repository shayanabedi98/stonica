import Container from "@/components/Container";
import ProductCarousel from "@/components/products/ProductCarousel";
import prisma from "@/lib/db";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  let product;

  try {
    product = await prisma.post.findUnique({
      where: { id },
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="ancestor-container">
      <Container>
        <div className="grid grid-cols-2">
          <ProductCarousel images={product?.images || []} />
        </div>
      </Container>
    </div>
  );
}

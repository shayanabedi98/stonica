import Container from "@/components/Container";
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
        <div>{product?.title}</div>
      </Container>
    </div>
  );
}

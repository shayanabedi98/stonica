import Container from "@/components/Container";
import Card from "@/components/products/Card";
import ProductCarousel from "@/components/products/ProductCarousel";
import ProductDescription from "@/components/products/ProductDescription";
import prisma from "@/lib/db";
import getAuthUser from "@/utils/getAuthUser";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  let product;
  let otherProducts;
  const authenticatedUser = await getAuthUser();

  try {
    product = await prisma.post.findUnique({
      where: { id },
      include: { User: true },
    });
    if (product) {
      otherProducts = await prisma.post.findMany({
        where: { userId: product?.User?.id },
        include: { User: true },
      });
    }
  } catch (error) {
    console.log(error);
  }

  if (!product) {
    return;
  }

  return (
    <div className="ancestor-container">
      <Container>
        <div className="grid grid-cols-2 gap-10">
          <ProductCarousel images={product?.images || []} />
          <ProductDescription product={product!} />
        </div>
        <div className="mt-32 flex flex-col items-center justify-center">
          <h2>More from {product?.User?.companyName}</h2>
          <div className="mt-20 grid grid-cols-3 items-center justify-items-center gap-10">
            {otherProducts
              ?.filter((item) => item.id !== product?.id)
              .slice(0, otherProducts.length < 3 ? otherProducts.length : 3)
              .map((item, index) => (
                <Card
                  signedInUser={authenticatedUser}
                  key={index}
                  formData={item}
                />
              ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

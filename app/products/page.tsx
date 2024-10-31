import Container from "@/components/Container";
import ProductsList from "@/components/products/ProductsList";
import getAuthUser from "@/utils/getAuthUser";

export default async function ProductsPage() {
  const signedInUser = await getAuthUser();

  return (
    <div className="ancestor-container">
      <Container>
        <div>
          <ProductsList signedInUser={signedInUser} />
        </div>
      </Container>
    </div>
  );
}

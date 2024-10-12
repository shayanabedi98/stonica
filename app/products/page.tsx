import Container from "@/components/Container";
import ProductsList from "@/components/products/ProductsList";

export default async function ProductsPage() {
  return (
    <div className="ancestor-container">
      <Container>
        <div>
          <ProductsList />
        </div>
      </Container>
    </div>
  );
}

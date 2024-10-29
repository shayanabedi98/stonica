import Container from "@/components/Container";
import LoadingCard from "@/components/posts/LoadingCard";
import ProductsList from "@/components/products/ProductsList";
import getAuthUser from "@/utils/getAuthUser";
import { Suspense } from "react";

export default async function ProductsPage() {
  const signedInUser = await getAuthUser();

  return (
    <div className="ancestor-container">
      <Container>
        <div>
          <Suspense fallback={<LoadingCard />}>
            <ProductsList signedInUser={signedInUser} />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}

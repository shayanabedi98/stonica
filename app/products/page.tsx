import ProductsPageContainer from "@/components/products/ProductsPageContainer";
import getAuthUser from "@/utils/getAuthUser";

export default async function ProductsPage() {
  const signedInUser = await getAuthUser();

  return (
    <div className="ancestor-container">
      <ProductsPageContainer signedInUser={signedInUser} />
    </div>
  );
}

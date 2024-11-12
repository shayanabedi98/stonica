import { Filter } from "@/components/products/Filter";
import ProductsList from "@/components/products/ProductsList";
import getAuthUser from "@/utils/getAuthUser";

export default async function ProductsPage() {
  const signedInUser = await getAuthUser();

  return (
    <div className="ancestor-container">
      <div className="relative grid grid-cols-4 gap-10 px-10">
        <div className="relative col-span-1">
          <Filter />
        </div>
        <div className="col-span-3 place-self-start">
          <ProductsList signedInUser={signedInUser} />
        </div>
      </div>
    </div>
  );
}

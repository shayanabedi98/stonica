export type User = {
  id: string;
  name: string;
  email: string;
  companyName: string | null;
  city: string | null;
  stateProvince: string | null;
  zipPostalCode: string | null;
  phone: string | null;
  image: string | null;
  isVendor?: boolean;
  wishlist: string[] | null;
} | null;

export type Product = {
  User?: User;
  id: string | undefined;
  textureType: string;
  title: string;
  type: string;
  width: string | null;
  height: string | null;
  images: string[];
  veins: string;
  bookmatched: string;
  price: number | null;
  salePrice?: number | null;
  imageId: string[];
  qty: number;
  baseColor: string | null;
  veinColor: string | null;
  secondaryColor: string | null;
};

export type FilterOptions = {
  minPriceRange: string;
  maxPriceRange: string;
  stoneType: string[];
  textureType: string[];
  baseColor: string | null;
  veinColor: string | null;
  secondaryColor: string | null;
  veins: string | null;
  bookmatched: string | null;
};

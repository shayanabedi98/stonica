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
  price: string;
  salePrice?: string | null;
  imageId: string[];
  qty: number;
  colors: string[] | null;
};

export type FilterOptions = {
  minPriceRange: string | number;
  maxPriceRange: string | number;
  stoneType: string[];
  textureType: string[];
  colors: string[] | null;
  veins: string | null;
  bookmatched: string | null;
};

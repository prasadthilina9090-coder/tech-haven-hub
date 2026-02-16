export type Category =
  | "laptops"
  | "laptop-parts"
  | "desktops"
  | "desktop-parts"
  | "mobile-parts";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: Category;
  brand: string;
  inStock: boolean;
  specs: string[];
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const categoryLabels: Record<Category, string> = {
  laptops: "Laptops",
  "laptop-parts": "Laptop Parts",
  desktops: "Desktops",
  "desktop-parts": "Desktop Parts",
  "mobile-parts": "Mobile Parts",
};

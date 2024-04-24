import { MenuItemProps } from "@mui/material/MenuItem";

export interface ProductSize {
  id?: number;
  size: string;
  size_inventory: number;
}
export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  inventory: number;
  color: string;
  style: string;
  material: string;
  category: string;
  gender: string;
  sizes: Array<ProductSize>;
}

export interface UserAddress {
  province: string;
  district: string;
  localLevel: string;
  wardNo: string;
  tole: string;
}

export interface ProductCardSliderType {
  products: Array<Product>;
  autoPlay?: boolean;
  title: string;
}

export interface BannerContent {
  id: number;
  imageUrl: string;
  redirectUrl: string;
}

export interface SelectItemType extends MenuItemProps {
  label: string;
}

import { MenuItemProps } from "@mui/material/MenuItem";

export interface ProductSize {
  id?: number;
  size: string;
  size_inventory: number;
  product?: number;
}

export interface UploadProductSize {
  size: string;
  size_inventory: string;
}

export interface ProductImage {
  id?: number;
  image: string;
}
export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  inventory?: number;
  color: string;
  style: string;
  material: string;
  category: string;
  gender: string;
  sizes: Array<ProductSize>;
  images: Array<ProductImage>;
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
  showViewMore?: boolean;
}

export interface BannerContent {
  id: number;
  imageUrl: string;
  redirectUrl: string;
}

export interface SelectItemType extends MenuItemProps {
  label: string;
}

export interface UserType {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  mobile_no: string;
  avatar: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
  size: string;
  price: number;
  name: string;
  imageUrl: string;
}

export interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
}

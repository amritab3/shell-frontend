import { MenuItemProps } from "@mui/material/MenuItem";
import { UUID } from "node:crypto";

export interface ProductSize {
  id?: UUID;
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
  id?: UUID;
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
  viewMoreRedirect?: string;
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

export interface CartProduct {
  images: Array<ProductImage>;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  quantity: number;
  size: string;
  product: CartProduct;
}

export interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
}

export interface FormSelectOption {
  label: string;
  value: string | number;
}

export interface PaginatedResponseType {
  count: number;
  next: string;
  previous: string;
  total_pages: number;
  page_size: number;
  current_page_number: number;
  results: Array<any>;
}

export interface ProductPaginatedResponseType extends PaginatedResponseType {
  results: Array<Product>;
}

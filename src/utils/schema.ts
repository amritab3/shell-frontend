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
  id?: string;
  image: string;
}
export interface ProductComment {
  id?: string;
  message: string;
  created_date: string;
}
export interface SellerDetails {
  id: string;
  name: string;
  email: string;
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
  type: string;
  sizes: Array<ProductSize>;
  images: Array<ProductImage>;
  comments: Array<ProductComment>;
  seller_details?: SellerDetails;
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
  id: string;
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

export interface CommentsPaginatedResponseType extends PaginatedResponseType {
  results: Array<ProductComment>;
}

export interface ChatReceiver {
  id: string;
  name: string;
}
export interface ChatRoomType {
  id: string;
  name: string;
  receiver: ChatReceiver;
}

export interface ChatMessageType {
  id: string;
  message: string;
  sender: string;
  timestamp: string;
}

export interface EsewaPaymentSuccessResponse {
  product_code: string;
  signature: string;
  signed_field_names: string;
  status: string;
  total_amount: string;
  transaction_code: string;
  transaction_uuid: string;
}

export interface PaymentOrderDetails {
  id: string;
  user_email: string;
  user_phone: string;
}

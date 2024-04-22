export interface Product {
  id: number;
  imageUrl: string;
  productName: string;
  productPrice: string;
}

export interface UserAddress {
  id: number;
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

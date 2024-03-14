export interface Product {
    id: number;
    imageUrl: string;
    productName: string;
    productPrice: string;
}

export interface ProductCardSliderType {
    products: Array<Product>;
    autoPlay: boolean;
}
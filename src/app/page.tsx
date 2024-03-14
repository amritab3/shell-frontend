import { Grid } from '@mui/material';

import { Product } from '@/utils/schema';
import ProductCardSlider from '@/components/ProductCardSlider'

export default function Home() {
    const products: Array<Product> = [
        {
            id: 1,
            imageUrl:
                'https://mode23nepal.com/image/catalog/Product/Feb%20sweatshirt%20+%20Zip/DSC00356.jpg',
            productName: 'Floral Dress',
            productPrice: '2300',
        },
        {
            id: 2,
            imageUrl:
                'https://mode23nepal.com/image/catalog/Product/Feb%20sweatshirt%20+%20Zip/DSC00356.jpg',
            productName: 'Floral Dress',
            productPrice: '2300',
        },
        {
            id: 3,
            imageUrl:
                'https://mode23nepal.com/image/catalog/Product/Feb%20sweatshirt%20+%20Zip/DSC00356.jpg',
            productName: 'Floral Dress',
            productPrice: '2300',
        },
        // {
        //     id: 4,
        //     imageUrl:
        //         'https://mode23nepal.com/image/catalog/Product/Feb%20sweatshirt%20+%20Zip/DSC00356.jpg',
        //     productName: 'Floral Dress',
        //     productPrice: '2300',
        // },
        // {
        //     id: 5,
        //     imageUrl:
        //         'https://mode23nepal.com/image/catalog/Product/Feb%20sweatshirt%20+%20Zip/DSC00356.jpg',
        //     productName: 'Floral Dress',
        //     productPrice: '2300',
        // },

    ];

    return (
        <Grid container item justifyContent="center">
            <ProductCardSlider products={products} autoPlay />
        </Grid>
    );
}


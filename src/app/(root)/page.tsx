import { Grid } from '@mui/material';

import { Product, BannerContent } from '@/utils/schema';
import ProductCardSlider from '@/components/ProductCardSlider';
import WebsiteBanner from '@/components/Banner';

export default function Home() {
    const bannerContents: Array<BannerContent> = [
        {
            id: 1,
            imageUrl:
                'https://images.pexels.com/photos/7679444/pexels-photo-7679444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            redirectUrl: ""
        },
        {
            id: 2,
            imageUrl:
                'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            redirectUrl: ""
            
        },
        {
            id: 3,
            imageUrl:
                'https://images.pexels.com/photos/5418890/pexels-photo-5418890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            redirectUrl: ""
            
        },
    ]
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
                'https://cdn.pixabay.com/photo/2024/01/15/04/30/woman-8509281_640.jpg',
            productName: 'Floral Dress',
            productPrice: '2300',
        },
        {
            id: 3,
            imageUrl:
                'https://cdn.pixabay.com/photo/2024/02/29/12/41/woman-8604350_640.jpg',
            productName: 'Floral Dress',
            productPrice: '2300',
        },
        {
            id: 4,
            imageUrl:
                'https://cdn.pixabay.com/photo/2023/11/09/19/36/zoo-8378189_640.jpg',
            productName: 'Floral Dress',
            productPrice: '2300',
        },
        {
            id: 5,
            imageUrl:
                'https://mode23nepal.com/image/catalog/Product/Feb%20sweatshirt%20+%20Zip/DSC00356.jpg',
            productName: 'Floral Dress',
            productPrice: '2300',
        },
        {
            id: 6,
            imageUrl:
                'https://mode23nepal.com/image/catalog/Product/Feb%20sweatshirt%20+%20Zip/DSC00356.jpg',
            productName: 'Floral Dress',
            productPrice: '2300',
        },
    ];

    return (
        <Grid container item justifyContent="center" gap={2}>
            <Grid item sx={{ width: '95%', margin: 2 }}>
                <WebsiteBanner bannerContents={bannerContents} />
            </Grid>

            <Grid item sx={{ width: '95%', margin: 2 }}>
                <ProductCardSlider title="New Arrivals" products={products} />
            </Grid>

            <Grid item sx={{ width: '95%', margin: 2 }}>
                <ProductCardSlider title="Men's Wear" products={products} />
            </Grid>
        </Grid>
    );
}

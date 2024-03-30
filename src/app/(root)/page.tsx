import { Grid } from '@mui/material';

import { Product, BannerContent } from '@/utils/schema';
import ProductCardSlider from '@/components/ProductCardSlider';
import WebsiteBanner from '@/components/Banner';

export default function Home() {
    const bannerContents: Array<BannerContent> = [
        {
            id: 1,
            imageUrl:
                'https://static.zara.net/photos///contents/mkt/spots/ss24-studio-collection-maintenance/subhome-xmedia-worldwide//w/1920/IMAGE-landscape-0224cf8b-a2e1-4ab7-a5a3-6c8d4923289b-default_0.jpg?ts=1710158285323',
            redirectUrl: ""
        },
        {
            id: 2,
            imageUrl:
                'https://static.zara.net/photos///contents/mkt/spots/ss24-north-woman-dresses/subhome-xmedia-13//w/1920/IMAGE-landscape-fill-6d47abd7-4a4e-4580-b8d4-fc1b9d1970fc-default_0.jpg?ts=1711560554796',
            redirectUrl: ""
            
        },
        {
            id: 3,
            imageUrl:
                'https://static.zara.net/photos///contents/mkt/spots/ss24-north-woman-shoes/subhome-xmedia-13-2//w/1920/IMAGE-landscape-fill-735480c8-6d15-4139-bc45-8c96bb41dc17-default_0.jpg?ts=1711557494527',
            redirectUrl: ""
            
        },
    ]
    const products: Array<Product> = [
        {
            id: 1,
            imageUrl:
                'https://static.zara.net/assets/public/1eec/f89d/8d444af59363/fb6a65279c57/04043049711-p/04043049711-p.jpg?ts=1711021465352&w=563',
            productName: 'Floral Dress',
            productPrice: '2300',
        },
        {
            id: 2,
            imageUrl:
                'https://static.zara.net/assets/public/e183/9b45/b23c4299a2e7/bfd49a6de5b6/04661318250-a2/04661318250-a2.jpg?ts=1711034076959&w=563',
            productName: 'Floral Dress',
            productPrice: '2300',
        },
        {
            id: 3,
            imageUrl:
                'https://static.zara.net/assets/public/4c11/32d5/bbe541b5a4c3/d8e288844546/05854025712-p/05854025712-p.jpg?ts=1710435725117&w=563',
            productName: 'Floral Dress',
            productPrice: '2300',
        },
        {
            id: 4,
            imageUrl:
                'https://static.zara.net/assets/public/c29c/f5db/967040f996bc/185cc2fe26c1/03992466822-p/03992466822-p.jpg?ts=1711442578008&w=364',
            productName: 'Floral Dress',
            productPrice: '2300',
        },
        {
            id: 5,
            imageUrl:
                'https://static.zara.net/assets/public/54a3/d631/c1c24f0c87a0/47823813eafe/05755430712-p/05755430712-p.jpg?ts=1711383520850&w=364',
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
            
            <Grid item sx={{ width: '95%', margin: 2 }}>
                <ProductCardSlider title="Women's Wear" products={products} />
            </Grid>

            <Grid item sx={{ width: '95%', margin: 2 }}>
                <ProductCardSlider title="Kid's Wear" products={products} />
            </Grid>
        </Grid>
    );
}

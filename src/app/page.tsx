import styles from './page.module.css';

import Card from '@/components/Card';
import { Product } from '@/utils/schema';

export default function Home() {
    const products: Array<Product> = [
        {
            id: 1,
            imageUrl:
                'https://mode23nepal.com/image/catalog/Product/Feb%20sweatshirt%20+%20Zip/DSC00356.jpg',
            productName: 'Floral Dress',
            productPrice: '2300',
        },
    ];

    return (
        <main className={styles.main}>
            {products.map(product => {
                return <Card key={product.id} product={product} />;
            })}
        </main>
    );
}

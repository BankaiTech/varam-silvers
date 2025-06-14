import { Suspense } from 'react';
import ProductDetail from './ProductDetail';

export async function generateMetadata({ params }) {
  return {
    title: `Product ${params.id}`,
    description: 'Product details page',
  };
}

export default async function ProductDetailPage({ params }) {
  // In a real app, you would fetch this data from an API or database
  const product = {
    id: parseInt(params.id),
    name: 'Silver Anklet',
    priceINR: 2499,
    priceUSD: 29.99,
    image: '/images/slide1.jpg',
    description: 'Beautiful silver anklet for little girls',
    wastagePercentage: 8,
    features: [
      'Made of 925 sterling silver',
      'Adjustable size',
      'Cute charm design',
      'Hypoallergenic',
    ],
    specifications: {
      material: '925 Sterling Silver',
      length: 'Adjustable (8-10 inches)',
      weight: '5 grams',
      purity: '92.5%',
      wastage: '8%',
    },
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetail product={product} />
    </Suspense>
  );
} 
import ProductDetailClient from './ProductDetailClient';

// Generate static params for all product IDs at build time
export function generateStaticParams() {
  // All product IDs: Chains (1-7), Earrings (8-16), Bracelets (17-20), Kada (22-30), Nazariya (32-34)
  const productIds = [
    // Chains
    '1', '2', '3', '4', '5', '6', '7',
    // Earrings
    '8', '9', '10', '11', '12', '13', '14', '15', '16',
    // Bracelets
    '17', '18', '19', '20',
    // Kada
    '22', '23', '24', '25', '26', '27', '28', '29', '30',
    // Nazariya
    '32', '33', '34'
  ];

  return productIds.map((id) => ({
    id: id,
  }));
}

export default async function ProductDetailPage({ params }) {
  // Unwrap params Promise (Next.js 15)
  const { id } = await params;
  
  return <ProductDetailClient productId={id} />;
}

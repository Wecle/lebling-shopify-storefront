import { Metadata } from 'next';
import { ProductListSection } from '@/features/products/components';
import { fetchProductListSection } from '@/lib/api/shopify';

export const metadata: Metadata = {
  title: 'Products',
  description: 'All Products from Next Shopify Storefront',
};

export default async function ProductsPage() {
  const data = await fetchProductListSection();

  return <ProductListSection data={data} />;
}

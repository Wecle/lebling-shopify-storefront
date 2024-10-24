import { Metadata } from 'next';
import { createMetadata } from '@site/lib/seo';
import { fetchProductSingleSection } from '@site/lib/api/shopify';
import { ProductSingleSection } from '@site/features/products/components';

interface Props {
  params: {
    handle: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await fetchProductSingleSection(params.handle);

  return createMetadata(product.title, product.description);
}

export default async function ProductPage({ params }: Props) {
  const data = await fetchProductSingleSection(params.handle);

  return <ProductSingleSection data={data} />;
}

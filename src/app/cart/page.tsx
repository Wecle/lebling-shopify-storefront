import { CartSection } from '@site/features/cart/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart',
};

export default function CartPage() {
  return <CartSection />;
}

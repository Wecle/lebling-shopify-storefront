import { CartSection } from '@/features/cart/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart',
};

export default function CartPage() {
  return <CartSection />;
}

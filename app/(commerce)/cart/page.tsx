import type { Metadata } from 'next';

import { CartPage } from '@/components/commerce/cart';
import { cartMetadata } from '@/seo/metadata';

export const metadata: Metadata = cartMetadata();

export default function CartRoutePage() {
  return <CartPage />;
}

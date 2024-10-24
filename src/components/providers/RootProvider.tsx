'use client';

import { ShopifyProvider, CartProvider } from '@shopify/hydrogen-react';
import { storeDomain, publicStorefrontToken, storefrontApiVersion } from '@site/lib/storefront';

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ShopifyProvider
      languageIsoCode="EN"
      countryIsoCode="US"
      storeDomain={storeDomain}
      storefrontToken={publicStorefrontToken}
      storefrontApiVersion={storefrontApiVersion}
    >
      <CartProvider>{children}</CartProvider>
    </ShopifyProvider>
  );
}

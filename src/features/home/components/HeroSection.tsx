'use client';

import { NextLink } from '@/lib/deps';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="mx-auto max-w-2xl py-10 sm:py-20 lg:py-32">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">LeBling Shopify Storefront</h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <NextLink
            href="/products"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Browse Products
          </NextLink>
          <Button>Drawer</Button>
        </div>
      </div>
    </section>
  );
}

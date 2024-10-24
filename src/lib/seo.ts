import { Metadata } from 'next';

export function createMetadata(title?: string, description?: string): Metadata {
  const baseTitle = 'Next Shopify Storefront';
  const baseDescription =
    '🛍 A Shopping Cart built with TypeScript, Tailwind CSS, Headless UI, Next.js, React.js, Shopify Hydrogen React,... and Shopify Storefront GraphQL API.';

  return {
    title: title ? `${title} | ${baseTitle}` : baseTitle,
    description: description || baseDescription,
    openGraph: {
      title: title ? `${title} | ${baseTitle}` : baseTitle,
      description: description || baseDescription,
    },
    twitter: {
      title: title ? `${title} | ${baseTitle}` : baseTitle,
      description: description || baseDescription,
    },
  };
}

import { formatTitle, invariant } from '@site/lib/deps';
import { storefront } from '@site/lib/storefront';
import { truncate } from 'lodash';

export async function fetchProductListSection(cursor?: string) {
  const { products } = await storefront.query({
    products: [
      { first: 12, after: cursor || null },
      {
        pageInfo: {
          hasNextPage: true,
        },
        edges: {
          cursor: true,
          node: {
            handle: true,
            title: true,
            priceRange: {
              minVariantPrice: {
                amount: true,
                currencyCode: true,
              },
            },
            featuredImage: {
              url: [{ transform: { maxWidth: 500 } }, true],
              altText: true,
              width: true,
              height: true,
            },
          },
        },
      },
    ],
  });

  return products;
}

export async function fetchProductSingleSection(handle: string) {
  const { productByHandle } = await storefront.query({
    productByHandle: [
      { handle },
      {
        title: true,
        description: [{ truncateAt: 256 }, true],
        seo: {
          title: true,
          description: true,
        },
        priceRange: {
          minVariantPrice: {
            amount: true,
            currencyCode: true,
          },
        },
        images: [
          { first: 250 },
          {
            nodes: {
              id: true,
              url: [
                {
                  transform: {
                    maxHeight: 600,
                  },
                },
                true,
              ],
              altText: true,
              width: true,
              height: true,
            },
          },
        ],
        options: [
          { first: 250 },
          {
            id: true,
            name: true,
            values: true,
          },
        ],
        variants: [
          { first: 250 },
          {
            nodes: {
              id: true,
              availableForSale: true,
              priceV2: {
                amount: true,
                currencyCode: true,
              },
              selectedOptions: {
                name: true,
                value: true,
              },
              image: {
                id: true,
              },
            },
          },
        ],
      },
    ],
  });

  invariant(productByHandle, `Product not found: ${handle}`);

  const { seo, title, description } = productByHandle;

  return {
    ...productByHandle,
    seo: {
      title: formatTitle(seo.title || title),
      description: seo.description || truncate(description, { length: 256 }),
    },
  };
}

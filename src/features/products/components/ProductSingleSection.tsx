'use client';

import { ProductPrice, AddToCartButton, ProductProvider } from '@shopify/hydrogen-react';
import { NextImage, DataProps, useVariantSelector } from '@/lib/deps';
import { fetchProductSingleSection } from '@/lib/api/shopify';
import { Button } from '@/components/shared';

export function ProductSingleSection(props: DataProps<typeof fetchProductSingleSection>) {
  const { variantId, options, selectOption } = useVariantSelector(props.data);

  return (
    <ProductProvider data={props.data}>
      <section>
        <div className="flex flex-col rounded-lg shadow-sm md:flex-row md:space-x-8">
          <div className="md:basis-6/12 ">
            <div className="size-full overflow-hidden rounded-lg bg-gray-200">
              <NextImage
                src={props.data.images.nodes[0].url}
                alt={props.data.images.nodes[0].altText || ''}
                width={props.data.images.nodes[0].width}
                height={props.data.images.nodes[0].height}
                className="min-h-[600px] w-full object-cover object-center"
              />
            </div>
          </div>

          <div className="md:basis-6/12">
            <div className="mt-4 pt-5 md:pt-10">
              <h2 className="sr-only">Product information</h2>

              <h1 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{props.data.title}</h1>

              <p className="mb-5 text-base text-gray-900">{props.data.description}</p>

              <div className="mb-5 text-3xl tracking-tight text-gray-900">
                <ProductPrice data={props.data}></ProductPrice>
              </div>

              <div className="mb-2">
                {options.map(({ name, values }) => (
                  <div className="mb-3" key={name}>
                    <div className="flex items-center justify-between">
                      <h3 className="mb-1 text-lg font-medium text-gray-900">{name}</h3>
                    </div>

                    {values.map(({ value, selected, disabled }) => {
                      return (
                        <Button
                          className="mr-1"
                          color={selected ? 'primary' : 'dark'}
                          size="sm"
                          key={value}
                          disabled={disabled}
                          onClick={() => selectOption(name, value)}
                        >
                          {value}
                        </Button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <AddToCartButton
                variantId={variantId}
                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 mt-10 flex w-full items-center justify-center rounded-md border border-transparent p-3 text-base font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-700"
              >
                Add to Cart
              </AddToCartButton>
            </div>
          </div>
        </div>
      </section>
    </ProductProvider>
  );
}

'use client';

import { NextImage, NextLink, useState, useAsyncFn, DataProps } from '@/lib/deps';
import { Money } from '@shopify/hydrogen-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { fetchProductListSection } from '@/lib/api/shopify';
import { Button } from '@/components/shared';

export function ProductListSection(props: DataProps<typeof fetchProductListSection>) {
  const [pages, setPages] = useState([props.data]);
  const lastPage = pages[pages.length - 1];
  const lastCursor = lastPage.edges[lastPage.edges.length - 1].cursor;
  const hasNextPage = lastPage.pageInfo.hasNextPage;

  const sectionRef = useRef(null);

  useEffect(() => {
    // 进入动画
    gsap.fromTo(
      sectionRef.current,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    // 离开动画
    return () => {
      gsap.to(sectionRef.current, {
        yPercent: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.in',
      });
    };
  }, []);

  const [loader, load] = useAsyncFn(async () => {
    const productList = await fetchProductListSection(lastCursor);
    setPages([...pages, productList]);
  }, [lastCursor]);

  return (
    <section ref={sectionRef}>
      <h2 className="sr-only">Products</h2>
      <div className="mb-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {pages
          .flatMap(({ edges }) => edges)
          .map(({ node }) => (
            <NextLink key={node.handle} href={`/products/${node.handle}`} className="group">
              <div className="w-full overflow-hidden rounded-lg bg-gray-200">
                <NextImage
                  src={node.featuredImage?.url || ''}
                  alt={node.featuredImage?.altText || ''}
                  height={node.featuredImage?.height}
                  width={node.featuredImage?.width}
                  className="size-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{node.title}</h3>

              <div className="mt-1 text-lg font-medium text-gray-900">
                <Money data={node.priceRange.minVariantPrice}></Money>
              </div>
            </NextLink>
          ))}
      </div>

      {hasNextPage && (
        <div className="text-center">
          <Button color={loader.error ? 'danger' : 'primary'} size="md" onClick={load} disabled={loader.loading}>
            {loader.loading ? 'Loading' : loader.error ? 'Try Again' : 'Load More'}
          </Button>
        </div>
      )}
    </section>
  );
}

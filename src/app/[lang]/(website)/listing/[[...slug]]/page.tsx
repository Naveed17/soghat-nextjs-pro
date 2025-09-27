import React, { cache, Suspense } from 'react';
import { fetchProductList, fetchFindBrands, fetchSearch } from '@src/actions';
import { notFound } from 'next/navigation';
import { Grid2, Stack } from '@mui/material';
import { ProductCard, ProductLoadingCard } from '@components/cards';
import { Pagination } from '@components/pagination';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
const fetchData = cache(async ({ slug, searchParams }: { slug: string[], searchParams?: { [key: string]: string | undefined } }): Promise<any> => {
    const page = searchParams?.page || '1';
    if (slug[0] === 'brands') {
        if (slug.length > 2) {
            return null;
        }
        return fetchFindBrands(slug[1].replace(/-/g, " "), page);
    }

    if (slug[0] === 'search') {
        if (!searchParams?.product && !searchParams?.brand && !searchParams?.category) {
            return null;
        }
        const payload = {
            Products_search: searchParams?.product?.replace(/-/g, " ") || "null",
            Brands_search: searchParams?.brand?.replace(/-/g, " ") || 'null',
            Categories_search: searchParams?.category?.replace(/-/g, " ") || 'null',
        };
        return fetchSearch(payload, page);
    }
    if (slug[1] === undefined) {
        notFound();
    }
    if (slug[1]) {
        if (slug.length > 2) {
            return null;
        }
        return fetchProductList({ slug: slug[0], type: slug[1], page });
    }

    return null;
})

async function ListingProducts({ params, searchParams }: { params: Promise<{ slug: string[] }>, searchParams?: Promise<{ [key: string]: string | undefined }> }): Promise<React.JSX.Element> {
    const { slug } = await params;
    const resolvedSearchParams = searchParams ? await searchParams : undefined;

    if (!slug) {
        notFound();
    }

    const data = await fetchData({ slug, searchParams: resolvedSearchParams });
    if (!data || !data.products || data.products.length === 0) {
        notFound();
    }

    const { products, pagination } = data;

    return (
        <Stack>
            <Grid2 container spacing={2}>
                {products.map((item: any) => (
                    <Grid2 size={{ xs: 6, md: 3 }} key={item.id}>
                        <ProductCard product={item} />
                    </Grid2>
                ))}
            </Grid2>
            <PaginationWrapper pagination={pagination} />
        </Stack>
    );
}

function PaginationWrapper({ pagination }: { pagination: any }) {
    if (!pagination) return null;
    return (
        <Stack width={1} my={2} alignItems="center">
            <Pagination {...pagination} />
        </Stack>
    );
}
async function ListingPage({ params, searchParams }: { params: Promise<{ slug: string[] }>, searchParams?: Promise<{ [key: string]: string | undefined }> }) {
    const { slug } = await params;
    const resolvedSearchParams = searchParams ? await searchParams : undefined;
    return (
        <Suspense key={JSON.stringify({ slug, searchParams: resolvedSearchParams })} fallback={
            <Stack>
                <Grid2 container spacing={2}>
                    {[...Array(12)].map((_, index) => (
                        <Grid2 size={{ xs: 6, md: 3 }} key={index}>
                            <ProductLoadingCard />
                        </Grid2>
                    ))}
                </Grid2>
            </Stack>
        }>
            <ListingProducts params={params} searchParams={searchParams} />
        </Suspense>
    );
}
export default ListingPage;


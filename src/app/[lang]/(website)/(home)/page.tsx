import { Container, Divider, Grid2, Stack, Typography } from "@mui/material";
import { CategoryDropdownButton } from "@src/components/buttons";
import { fetchWebsiteContent } from '@src/actions'
import { Suspense } from "react";
import Banner from "./components/banner";
import TopCategories from "./components/topCategory";
import Image from "next/image";
import BannerModal from "@interfaces/banner";
import Link from "next/link";
import { ProductSlider } from "@src/components/productSlider";
import { BrandCard } from "@components/cards";
import React from "react";
import { getImageUrl } from "@src/utils/getImageUrl";
import { Metadata } from "next";
import { BannerSkeleton, CategorySkeleton, ProductSliderSkeleton, BrandsSkeleton } from "./components/loading";
export const dynamic = 'force-dynamic';
export const revalidate = 300;

export const generateMetadata = async (): Promise<Metadata> => {
    const base_url = process.env.NEXT_PUBLIC_BASE_URL
    const response: any = await fetchWebsiteContent();
    const meta_data = response?.WebsiteContentFind;
    if (!meta_data) {
        return {
            title: '404',
            description: '404',
        };
    }
    const {
        home_page_meta_title,
        website_name,
        home_page_meta_robots,
        home_page_meta_keywords,
        home_page_meta_description,
        home_page_meta_author,
        header_logo,
    } = meta_data;
    const keywordsArray = home_page_meta_keywords
        ? home_page_meta_keywords.split(',').map((keyword: string) => keyword.trim())
        : [];


    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
        alternates: {
            canonical: '/',
            languages: {
                'en-US': '/en',
                'ar-SA': '/ar',
            },
        },
        keywords: keywordsArray,
        title: home_page_meta_title,
        authors: home_page_meta_author,
        robots: home_page_meta_robots,
        applicationName: website_name,
        creator: website_name,
        publisher: website_name,
        generator: 'Next.js',
        referrer: 'origin-when-cross-origin',
        description: home_page_meta_description,
        openGraph: {
            title: home_page_meta_title,
            description: home_page_meta_description,
            url: process.env.NEXT_PUBLIC_SITE_URL!,
            siteName: website_name,
            images: [
                {
                    url: `${base_url}/${header_logo}`,
                    width: 1200,
                    height: 630,
                },
            ],
            locale: 'en_US',
            type: 'website',
        },
    };
};


// Separate components for better loading
function HeroBanner({ banners }: { banners: BannerModal[] }) {
    return (
        <Suspense fallback={<BannerSkeleton />}>
            <Banner banners={banners} />
        </Suspense>
    );
}

function CategoriesSection({ categories }: { categories: any[] }) {
    if (!categories?.length) return null;
    return (
        <Suspense fallback={<CategorySkeleton />}>
            <Stack spacing={3}>
                <Typography variant="h4" lineHeight='80%'>Top Categories</Typography>
                <Divider sx={{ mb: '8px !important' }} />
                <TopCategories categories={categories} />
            </Stack>
        </Suspense>
    );
}

function SmallBannersSection({ smallBanners }: { smallBanners: BannerModal[] }) {
    if (!smallBanners?.length) return null;
    return (
        <Stack position='relative' className="home-banner" my={1}>
            <Grid2 container spacing={2}>
                {smallBanners.map((item: BannerModal, index: number) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <div style={{ position: 'relative', height: '200px', borderRadius: '8px', overflow: 'hidden' }}>
                            <Image
                                src={getImageUrl('banner', item.image)}
                                alt={item.image || 'Small banner'}
                                fill
                                style={{ objectFit: "cover" }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                loading="lazy"
                            />
                        </div>
                    </Grid2>
                ))}
            </Grid2>
        </Stack>
    );
}

function ProductCategorySection({ item }: { item: any }) {
    return (
        <Suspense fallback={<ProductSliderSkeleton />}>
            <Stack spacing={3}>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant="h4" lineHeight='80%'>{item.name}</Typography>
                    <Link href={`listing/${item.slug}/${item.type}`}>View More</Link>
                </Stack>
                <Divider sx={{ mb: '8px !important' }} />
                <ProductSlider products={item.products} />
            </Stack>
        </Suspense>
    );
}

function BrandsSection({ brands }: { brands: any[] }) {
    if (!brands?.length) return null;
    return (
        <Suspense fallback={<BrandsSkeleton />}>
            <Stack spacing={2}>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant="h4" lineHeight='80%'>Popular Brands</Typography>
                    <Link href='/brands/list'>View all brands</Link>
                </Stack>
                <Divider sx={{ mb: '8px !important' }} />
                <Stack sx={{
                    display: 'grid',
                    gap: '1px',
                    gridTemplateColumns: {
                        xs: 'repeat(3, minmax(100px, 1fr))',
                        md: 'repeat(6, minmax(100px, 1fr))'
                    },
                }}>
                    {brands.map((item: any) => (
                        <BrandCard key={item.id} brand={item} />
                    ))}
                </Stack>
            </Stack>
        </Suspense>
    );
}

export default async function Home() {
    const data = await fetchWebsiteContent();
    const categories = data?.categories || [];
    const category_feature = (data?.category_feature_name || []);
    const banners = data?.banners?.filter((item: BannerModal) => item.type === "banners") || [];
    const smallBanners = data?.banners?.filter((item: BannerModal) => item.type === "smallbanners") || [];
    const categories2 = data?.home_feature__categories_product || [];
    const popularBrands = data?.brands || [];

    return (
        <Stack component='section' pb={5} overflow='hidden'>
            <Container maxWidth='lg'>
                <CategoryDropdownButton categories={categories} />
                <Stack sx={{ gap: 3 }} mt={4}>
                    <HeroBanner banners={banners} />
                    <CategoriesSection categories={category_feature} />
                    <SmallBannersSection smallBanners={smallBanners} />
                    {categories2.map((item: any) => {
                        if (!item.products?.length) return null;
                        return <ProductCategorySection key={item.cat_id} item={item} />;
                    })}
                    <BrandsSection brands={popularBrands} />
                </Stack>
            </Container>
        </Stack>
    );
}
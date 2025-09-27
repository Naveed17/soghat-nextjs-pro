import { Box, Container, Divider, Grid2, Stack, Typography } from "@mui/material";
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
export const revalidate = 10;
export default async function Home() {
    const data = await fetchWebsiteContent();
    const categories = data?.categories || [];
    const category_feature = data?.home_feature__categories || [];
    const banners = data?.banners?.filter((item: BannerModal) => item.type === "banners") || [];
    const smallBanners = data?.banners?.filter((item: BannerModal) => item.type === "smallbanners") || [];
    const categories2 = data?.home_feature__categories_product || [];
    const papularBrands = data?.brands || [];

    return (
        <Stack component='section' pb={8} overflow='hidden'>
            <Container maxWidth='lg'>
                <CategoryDropdownButton categories={categories} />
                <Stack spacing={3} mt={3}>
                    <Stack className="banner">
                        <Banner {...{ banners }} />
                    </Stack>
                    {category_feature?.length > 0 &&
                        <Stack>
                            <Typography variant="h4" gutterBottom>
                                Top Categories
                            </Typography>
                            <Divider />
                            <Stack mt={3}>
                                <TopCategories {...{ categories: category_feature }} />
                            </Stack>
                        </Stack>

                    }
                    <Stack
                        position='relative'
                        className="home-banner">
                        <Grid2 container spacing={2}>
                            {smallBanners.map((item: BannerModal, index: number) => (
                                <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                                    <Image
                                        src={`https://khaasdeal.com/bucket/images/soghats/uploads/banners/${item.image}`}
                                        alt={item.image}
                                        fill
                                        style={{ objectFit: "cover" }}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className='mix-blend-multiply'
                                        loading="lazy"
                                    />
                                </Grid2>
                            ))}
                        </Grid2>
                    </Stack>
                    {categories2.map((item: any) => {
                        if (item.products.length === 0) {
                            return;
                        }
                        return (
                            <Stack key={item.cat_id} spacing={3}>
                                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                    <Typography variant="h4" gutterBottom>
                                        {item.name}
                                    </Typography>
                                    <Link href={`listing/${item.slug}/${item.type}`}>
                                        View More
                                    </Link>
                                </Stack>
                                <Divider />

                                <ProductSlider products={item.products} />

                            </Stack>
                        )
                    })}
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant="h4" gutterBottom>
                            Papular Brands
                        </Typography>
                        <Link href='/brands/list'>
                            View all brands
                        </Link>
                    </Stack>
                    <Divider />
                    <Stack sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(3, minmax(100px, 1fr))',
                            md: 'repeat(6, minmax(100px, 1fr))'
                        },
                    }}>
                        {papularBrands.map((item: any) => (
                            <React.Fragment key={item.id}>
                                <BrandCard brand={item} />
                            </React.Fragment>
                        ))}
                    </Stack>
                </Stack>
            </Container>
        </Stack>
    );
}
import React from 'react'
import { fetchAllProducts, fetchProductDetails } from '@src/actions'
import { Box, Container, Divider, Grid2 as Grid, Stack, Typography } from '@mui/material';
import ProductSlider from './_components/productSlider';
import ProductDetails from './_components/productDetails';
import { ProductSlider as RelatedProductSlider } from '@components/productSlider';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { getImageUrl } from '@src/utils/getImageUrl';
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const generateStaticParams = async () => {
    try {
        const result = await fetchAllProducts();

        if (!result || !result.data || !Array.isArray(result.data) || result.data.length === 0) {
            console.warn('No products found.');
            return [];
        }

        const { data: response } = result;

        return response
            .map(({ id }: { id: number }) => ({ id: `${id}` }))
            .slice(0, 10);
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
};

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }, parent: ResolvingMetadata): Promise<Metadata> => {
    const { id } = await params;
    const data = await fetchProductDetails(id);
    if (!data.products.length) {
        return {
            title: 'Product not found'
        }
    }
    const product = data.products[0];
    const previousImages = (await parent).openGraph?.images || [];
    const desc = product.desc.replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/Synopsis/gi, "")
        .replace(/:/g, "")
        .trim().slice(0, 150) + '...';
    return {
        title: product.name,
        description: desc,
        openGraph: {
            title: product.name,
            description: desc,
            images: [getImageUrl('product', product.image), ...previousImages],


        },
    }
}
async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }): Promise<React.JSX.Element> {
    const { id } = await params;
    const data = await fetchProductDetails(id);
    const related_items = data?.related_items;
    if (!data.products.length) {
        notFound()
    }
    const product = data.products[0];
    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <ProductSlider {...{ images: product.images }} />
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                    <ProductDetails {...{ product }} />
                </Grid>
            </Grid>
            <Box sx={{
                '& .text-container': {
                    strong: {
                        fontWeight: 600
                    },
                    ul: {
                        pl: 3.5,
                        '&:first-of-type': {
                            my: 2

                        },
                        '&:last-of-type': {
                            mb: 2

                        },
                        li: {
                            listStyleType: 'none',
                            mb: .5,
                            '&::marker': { content: '" "', display: 'none' },
                            '&::before': {
                                content: '">"',
                                color: 'text.secondary',
                                fontWeight: 500,
                                display: 'inline-block',
                                width: '1em',
                                marginLeft: '-1em',
                                position: 'absolute'
                            }
                        }
                    }
                }
            }} border={1} borderRadius={2} borderColor='divider' p={3} mt={3} mb={4}>


                <div className="text-container" dangerouslySetInnerHTML={{ __html: product.desc }} />
            </Box>
            <Stack mb={3} overflow={{ xs: 'hidden', sm: 'visible' }}>
                <Typography variant='h3' mb={2}>
                    Related Products
                </Typography>
                <RelatedProductSlider products={related_items} />
            </Stack>
        </Container>
    )
}

export default ProductDetailsPage
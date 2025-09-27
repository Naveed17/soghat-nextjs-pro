'use client'
import { Box, Divider, Grid2 as Grid, Rating, Stack, Typography, Link as MuiLink, Button, Card, CardHeader } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import CartDrawer from './drawer';
import { getMinPrice } from '@src/utils/getMinPrice';
import { getImageUrl } from '@src/utils/getImageUrl';
import {
    FacebookShareButton,
    FacebookIcon,
} from 'react-share'
function ProductDetails({ ...props }) {
    const { product } = props;
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <Stack>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 7 }}>
                    <Typography variant='h3' fontWeight={600}>{product.name}</Typography>
                    <Stack direction='row' alignItems='center' spacing={2}>
                        <Rating size='small' name="read-only" value={0} readOnly />
                        <Typography variant='body2'>( 0 Reviews )</Typography>

                    </Stack>
                    <Divider sx={{ mt: 2 }} />
                    <Stack spacing={2} mt={2} alignItems='flex-start'>
                        <Stack border={1} borderColor='primary.main' borderRadius={1} px={1.5} py={1} direction='row' alignItems='flex-start' spacing={2} bgcolor='grey.100' minWidth={280}>
                            <Box borderRadius={1} overflow='hidden'>
                                <Image width={60} height={60} src={getImageUrl('brand', product?.brand?.img)} alt={product?.brand?.name} />
                            </Box>
                            <Stack spacing={0.1} sx={{ a: { fontSize: 12, color: 'primary.main' } }}>
                                <Typography variant='body2'>Brand</Typography>
                                <Typography variant='body2'>{product?.brand?.name}</Typography>
                                <Link href={`/listing/brands/${(product?.brand?.name)?.replace(/ /g, "-")}`}>View More Products from Brand</Link>

                            </Stack>
                        </Stack>
                        <Stack direction='row' alignItems='center' spacing={1}>
                            <Typography variant='h4' fontWeight={600}>
                                Start From:
                            </Typography>
                            <Typography variant='h4' fontWeight={500}>
                                Rs {getMinPrice(product?.variant)}
                            </Typography>
                        </Stack>
                        <Stack width={1} maxWidth={290}>
                            <Typography fontSize={18} variant='subtitle1'>
                                Variations
                            </Typography>
                            <Stack width={1} direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography>
                                    Available in {product.variant.length} variants
                                </Typography>
                                <MuiLink onClick={toggleDrawer(true)} sx={{ cursor: 'pointer' }}>
                                    Select now
                                </MuiLink>
                            </Stack>
                            <Stack direction='row' alignItems='center' spacing={1} mt={2}>
                                <Button onClick={toggleDrawer(true)} sx={{ textWrapMode: 'nowrap' }} fullWidth startIcon={<ShoppingCartOutlinedIcon />} variant='contained'>Add to Cart</Button>

                            </Stack>
                        </Stack>
                        <Stack>
                            <Typography fontWeight={500} gutterBottom>Share</Typography>
                            <Stack direction='row' spacing={1}>
                                <FacebookShareButton
                                    url={`${process.env.NEXT_PUBLIC_SITE_URL!}/product-details/${product.id}`}
                                    title={product.name}

                                >
                                    <FacebookIcon
                                        size={28} round />
                                </FacebookShareButton>
                            </Stack>


                        </Stack>
                    </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 5 }}>
                    <Stack p={1.5} sx={{ borderColor: 'divider' }} border={1} spacing={1.5} bgcolor={'grey.200'} borderRadius={3}>
                        {['Officially Granted – No Compromises, Just Quality!', 'Fast and Reliable Delivery', 'Secure Payment'].map((item: string, idx: number) =>
                            <Card
                                key={idx}
                                sx={{ borderRadius: 3, border: 1, borderColor: 'divider' }}
                            >
                                <CardHeader
                                    sx={{ p: 1, py: 2 }}
                                    avatar={
                                        <VerifiedUserRoundedIcon fontSize='large' color='primary' />
                                    }
                                    titleTypographyProps={{ fontSize: 14, fontWeight: 600 }}
                                    title={item}

                                />
                            </Card>
                        )}
                    </Stack>
                </Grid>
            </Grid>
            <CartDrawer {...{ open, toggleDrawer, product }} />
        </Stack>
    )
}

export default ProductDetails
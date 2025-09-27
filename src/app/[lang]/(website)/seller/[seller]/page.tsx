import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, Container, Fab, Grid2 as Grid, Grid2, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import { Icon } from "@iconify/react";
import { Metadata } from 'next/types';
import React, { Suspense } from 'react'
import { notFound } from 'next/navigation';
import { fetchSellerDetails } from '@src/actions';
import { ProductCard, ProductLoadingCard } from '@components/cards';
export const metadata: Metadata = {
    title: 'Seller'



};
async function ListingProducts({ ...props }): Promise<React.JSX.Element> {
    const { data } = props;
    if (data.products.length === 0) {
        return <Stack>
            <Typography variant='h5'>Not Found</Typography>
            <Typography>Could not find requested Products</Typography>
        </Stack>
    }

    const { products } = data;

    return (
        <Stack>
            <Grid2 container spacing={2}>
                {products.map((item: any) => (
                    <Grid2 size={{ xs: 6, md: 3 }} key={item.id}>
                        <ProductCard product={item} />
                    </Grid2>
                ))}
            </Grid2>
        </Stack>
    );
}

export default async function Page({ params }: { params: Promise<{ seller: string }> }): Promise<JSX.Element> {
    const { seller } = await params
    const data = await fetchSellerDetails(seller);
    const store_profile = data.store_profile;
    function stringAvatar(name: string) {
        if (!name) return { children: "" };
        const parts = name.split(" ");
        if (parts.length > 1) {
            return { children: `${parts[0][0]}${parts[1][0]}`.toUpperCase() };
        } else {
            return { children: `${name[0]}${name[name.length - 1]}`.toUpperCase() };
        }
    }

    return (
        <Container maxWidth='lg'>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <Card>
                        <CardMedia
                            sx={{ height: 140 }}
                            image="/static/images/login-signup-bg.jpg"
                            title="green iguana"
                        />
                        <CardHeader
                            sx={{
                                flexDirection: { xs: 'column', sm: 'row' },
                                '.MuiCardHeader-avatar': {
                                    alignSelf: { xs: 'center', sm: 'flex-start' },
                                    mr: { xs: 0, sm: 2 }
                                },
                                pt: 0, mt: { xs: -8, sm: -4 },
                                '.MuiCardHeader-action': {
                                    alignSelf: 'flex-start',
                                    margin: 0,
                                    pt: { xs: 2, sm: 6 }
                                },
                                '.MuiCardHeader-content': {
                                    width: '100%'
                                }
                            }}
                            avatar={
                                <Avatar {...stringAvatar(store_profile.name)} sx={{ bgcolor: 'common.black', border: 3, borderColor: 'common.white', width: 128, height: 128, fontSize: 48, fontWeight: 700 }} />



                            }
                            title={
                                <Stack spacing={1} pt={{ xs: 1, sm: 5 }}>
                                    <Stack alignItems={{ xs: 'center', sm: 'flex-start' }}>
                                        <Typography textTransform='capitalize' variant='h4'>{store_profile.name}</Typography>
                                        <Typography color="text.secondary" fontWeight={500}>{store_profile.email}</Typography>
                                    </Stack>
                                    <List sx={{
                                        display: 'grid', width: 1,

                                        gridTemplateColumns: {
                                            xs: 'repeat(2, 1fr)',
                                            sm: 'repeat(3, 1fr)'
                                        },


                                    }}>
                                        <ListItem>
                                            <Stack spacing={1}>
                                                <Typography fontWeight={500}>
                                                    Location
                                                </Typography>
                                                <Stack direction="row" spacing={.5} alignItems="center">
                                                    <ListItemIcon sx={{ minWidth: 0 }}>
                                                        <Icon icon="mdi:map-marker" width="18" height="18" />
                                                    </ListItemIcon>
                                                    <ListItemText primaryTypographyProps={{ fontSize: 12 }} primary={store_profile.city || 'Not Available'} />
                                                </Stack>
                                            </Stack>
                                        </ListItem>
                                        <ListItem>
                                            <Stack spacing={1}>
                                                <Typography fontWeight={500}>
                                                    Joined
                                                </Typography>
                                                <Stack direction="row" spacing={.5} alignItems="center">
                                                    <ListItemIcon sx={{ minWidth: 0 }}>
                                                        <Icon icon="mdi:clipboard-text-date" width="18" height="18" />
                                                    </ListItemIcon>
                                                    <ListItemText primaryTypographyProps={{ fontSize: 12 }} primary={
                                                        new Date(store_profile.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })
                                                    } />
                                                </Stack>
                                            </Stack>
                                        </ListItem>
                                        <ListItem>
                                            <Stack spacing={1}>
                                                <Typography fontWeight={500}>
                                                    Total Products
                                                </Typography>
                                                <Stack direction="row" spacing={.5} alignItems="center">
                                                    <ListItemIcon sx={{ minWidth: 0 }}>
                                                        <Icon icon="solar:suitcase-outline" width="18" height="18" />
                                                    </ListItemIcon>
                                                    <ListItemText primaryTypographyProps={{ fontSize: 12 }} primary={data.products.length} />
                                                </Stack>
                                            </Stack>
                                        </ListItem>
                                    </List>
                                </Stack>
                            }


                            action={
                                store_profile.status === '1' ?

                                    <Icon icon="material-symbols:verified-outline-rounded" width="32" height="32" color='green' /> :
                                    <Icon icon="material-symbols:verified-outline-rounded" width="32" height="32" color="red" />
                            }

                        />

                    </Card>
                    <Stack mt={4}>
                        <Suspense key={seller} fallback={
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
                            <ListingProducts {...{ data }} />
                        </Suspense>
                    </Stack>
                </Grid>
            </Grid>
            <Box mt={3} />
        </Container>
    )
}

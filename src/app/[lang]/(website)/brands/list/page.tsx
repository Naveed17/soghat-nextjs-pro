import React from 'react'
import { fetchBrandsList } from '@src/actions'
import { Container, Divider, Stack, Typography } from '@mui/material';
import { Breadcrumbs } from '@components/breadcrumbs';
import { BrandCard } from '@components/cards';
async function BrandListPage() {
    const data = await fetchBrandsList();
    const brands = data?.brands || []

    return (
        <Container maxWidth='lg'>
            <Breadcrumbs data={[
                { title: 'Brand', href: null }
            ]} />
            <Typography mt={2} variant="h4">Popular Brands</Typography>
            <Divider sx={{ mt: 2, mb: 4 }} />
            <Stack sx={{
                mb: 4,
                display: 'grid',
                gap: '1px',
                gridTemplateColumns: {
                    xs: 'repeat(3, minmax(100px, 1fr))',
                    md: 'repeat(6, minmax(100px, 1fr))'
                },
            }}>
                {brands.map((item: any) => (
                    <React.Fragment key={item.id}>
                        <BrandCard brand={item} />
                    </React.Fragment>
                ))}
            </Stack>
        </Container>
    )
}

export default BrandListPage
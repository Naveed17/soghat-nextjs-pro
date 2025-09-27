import { Container, Stack } from '@mui/material';
import React from 'react'
import { Breadcrumbs } from '@components/breadcrumbs'
import Grid from '@mui/material/Grid2';
import Aside from './components/aside';
import FilterButton from './components/filterButton';
import { fetchBrandsList } from '@src/actions';
// add meta data
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    return {
        title: `Products - ${slug}`
    }
}
async function ListingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const response = await fetchBrandsList();
    const brands = response.brands || []
    return (
        <Container maxWidth="lg">
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Breadcrumbs data={[
                    { title: 'Shop', href: null }
                ]} />
                <FilterButton />
            </Stack>
            <Stack mt={3}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, lg: 3 }}>
                        <Aside {...{ brands }} />
                    </Grid>
                    <Grid size={{ xs: 12, lg: 9 }}>
                        {children}
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    )
}

export default ListingLayout
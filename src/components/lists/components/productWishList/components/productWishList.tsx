'use client'
import {
    Box,
    Container,
    Grid2 as Grid,
    Stack
} from '@mui/material';
import React from 'react';

import { useAppSelector } from '@lib/redux/store';
import { selectWishlist } from '@lib/redux/wishlist';
import { ProductCard } from '@components/cards';
import { EmptyContent } from '@components/emptyContent';



export default function ProductList() {
    let { wishlist } = useAppSelector(selectWishlist);

    return (
        <Container maxWidth="lg">
            {wishlist.length === 0 && <EmptyContent
                title="Your Wishlist is Empty"
                description="Look like you have no items in your wishlist."
                img="/static/images/empty_basket.jpg"
            />}
            <Box mb={6} />
            <Stack sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)',
                    lg: 'repeat(5, 1fr)',
                },
                gap: 2
            }}>
                {wishlist.map((product: any) => (
                    <React.Fragment key={product.id}>
                        <ProductCard product={product?.product} />
                    </React.Fragment>
                ))}
            </Stack>
            <Box mb={6} />
        </Container>
    );
}

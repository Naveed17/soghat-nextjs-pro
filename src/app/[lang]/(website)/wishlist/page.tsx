import { Breadcrumbs } from '@components/breadcrumbs'
import { ProductWishList } from '@components/lists'
import { Container, Typography } from '@mui/material'
import React from 'react'

function WishList() {
    return (
        <Container>
            <Breadcrumbs data={[
                { title: 'Wishlist', href: null }
            ]} />
            <ProductWishList />
        </Container>
    )
}

export default WishList
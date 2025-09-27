import React from 'react'
import OrderTrackingForm from './_components/orderTrackingForm'
import { Box, Container } from '@mui/material'
import { Breadcrumbs } from '@components/breadcrumbs'
import { Metadata } from 'next'
export const metadata: Metadata = {
    title: "Order Tracking"
}
function OrderTracking() {
    return (
        <Container maxWidth="lg">
            <Breadcrumbs data={[{
                href: null,
                title: "Order Tracking"
            }]} />
            <Box my={3} />
            <OrderTrackingForm />
        </Container>
    )
}

export default OrderTracking
import { Breadcrumbs } from '@components/breadcrumbs';
import { Box, Container, GlobalStyles, Typography } from '@mui/material';
import { fetchWebsiteContent } from '@src/actions';
import { Metadata } from 'next/types';
import React from 'react'
export const metadata: Metadata = {
    title: "Order Cancellation"
}
async function OrderCancellation() {
    const data = await fetchWebsiteContent();
    const { order_cancellation_page } = data?.WebsiteContentFind

    return (<>
        <GlobalStyles styles={{
            '.ql-hidden': {
                display: 'none'
            },
            '.ql-editor': {
                pointerEvents: 'none',
                ol: {
                    li: {
                        marginTop: 4,
                        marginBottom: 4,
                    }
                }
            }

        }} />
        <Container maxWidth="lg">
            <Breadcrumbs data={[{
                href: null,
                title: "Order Cancellation"
            }]} />
            <Typography mt={3} textAlign={'center'} variant='h3'>Order Cancellation</Typography>
            <Box my={3}>
                <div dangerouslySetInnerHTML={{ __html: order_cancellation_page }} />
            </Box>
        </Container>
    </>
    )
}

export default OrderCancellation
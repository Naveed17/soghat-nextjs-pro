import { Breadcrumbs } from '@components/breadcrumbs';
import { Box, Container, GlobalStyles, Typography } from '@mui/material';
import { fetchWebsiteContent } from '@src/actions';
import { Metadata } from 'next/types';
import React from 'react'
export const metadata: Metadata = {
    title: "Delivery Policy"
}
async function PrivacyPolicy() {
    const data = await fetchWebsiteContent();
    const { delivery_policy_page } = data?.WebsiteContentFind

    return (
        <>
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
                    title: "Delivery Policy"
                }]} />
                <Typography mt={3} textAlign={'center'} variant='h3'>Delivery Policy</Typography>
                <Box my={3}>
                    <div dangerouslySetInnerHTML={{ __html: delivery_policy_page }} />
                </Box>
            </Container>
        </>
    )
}

export default PrivacyPolicy
import { Breadcrumbs } from '@components/breadcrumbs';
import { Box, Container, GlobalStyles, Typography } from '@mui/material';
import { fetchWebsiteContent } from '@src/actions';
import { Metadata } from 'next/types';
import React from 'react'
export const metadata: Metadata = {
    title: "Return Exchange Policy"
}
async function ReturnExchangePolicy() {
    const data = await fetchWebsiteContent();
    const { return_exchange_policy_page } = data?.WebsiteContentFind

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
                    title: "Return Exchange Policy"
                }]} />
                <Typography mt={3} textAlign={'center'} variant='h3'>Return Exchange Policy</Typography>
                <Box my={3}>
                    <div dangerouslySetInnerHTML={{ __html: return_exchange_policy_page }} />
                </Box>
            </Container>
        </>
    )
}

export default ReturnExchangePolicy
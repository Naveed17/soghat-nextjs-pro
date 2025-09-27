import { Breadcrumbs } from '@components/breadcrumbs';
import { Box, Container, GlobalStyles, Typography } from '@mui/material';
import { fetchWebsiteContent } from '@src/actions';
import { Metadata } from 'next/types';
import React from 'react'
export const metadata: Metadata = {
    title: "Terms and Conditions"
}
async function TermsAndConditions() {
    const data = await fetchWebsiteContent();
    const { terms_and_conditions } = data?.WebsiteContentFind;

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
                    title: "Terms And Conditions"
                }]} />
                <Typography mt={3} textAlign={'center'} variant='h3'>Terms And Conditions</Typography>
                <Box my={3}>
                    <div dangerouslySetInnerHTML={{ __html: terms_and_conditions }} />
                </Box>
            </Container>
        </>
    )
}

export default TermsAndConditions
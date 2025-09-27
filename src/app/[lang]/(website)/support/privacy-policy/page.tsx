import { Breadcrumbs } from '@components/breadcrumbs';
import { Box, Container, GlobalStyles, Typography } from '@mui/material';
import { fetchWebsiteContent } from '@src/actions';
import { Metadata } from 'next/types';
import React from 'react'
export const metadata: Metadata = {
    title: "Privacy Policy"
}
async function PrivacyPolicy() {
    const data = await fetchWebsiteContent();
    const { privacy_policy_page } = data?.WebsiteContentFind;
    return (
        <>
            <GlobalStyles styles={{
                '.ql-hidden': {
                    display: 'none'
                },
                '.ql-editor': {
                    pointerEvents: 'none'
                }
            }} />
            <Container maxWidth="lg">
                <Breadcrumbs data={[{
                    href: null,
                    title: "Privacy Policy"
                }]} />
                <Typography mt={3} textAlign={'center'} variant='h3'>Privacy Policy</Typography>
                <Box mb={3} />
                <div dangerouslySetInnerHTML={{ __html: privacy_policy_page }} />
                <Box mb={3} />
            </Container>
        </>
    )
}

export default PrivacyPolicy
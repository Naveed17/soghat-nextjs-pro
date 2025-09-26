import { Breadcrumbs } from '@components/breadcrumbs';
import { Box, Container, Typography } from '@mui/material';
import { fetchWebsiteContent } from '@src/actions';
import GlobalStyles from '@mui/material/GlobalStyles';
import React from 'react'
import { Metadata } from 'next/types';
export const metadata: Metadata = {
    title: "About Us"
}
async function AboutPage() {
    const data = await fetchWebsiteContent();
    const { about_us_page } = data?.WebsiteContentFind;
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
                    title: "About Us"
                }]} />
                <Typography mt={3} textAlign={'center'} variant='h3'>About Us</Typography>
                <Box my={3} sx={{

                }}>
                    <div dangerouslySetInnerHTML={{ __html: about_us_page }} />
                </Box>
            </Container>
        </>
    )
}

export default AboutPage
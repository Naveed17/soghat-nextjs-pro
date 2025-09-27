import { Breadcrumbs } from '@components/breadcrumbs';
import { Box, Container, Typography } from '@mui/material';
import { fetchWebsiteContent } from '@src/actions';
import React from 'react'

async function AboutPage() {
    const data = await fetchWebsiteContent();
    const { about_us_page } = data?.WebsiteContentFind;
    return (
        <Container maxWidth="lg">
            <Breadcrumbs data={[{
                href: null,
                title: "About Us"
            }]} />
            <Typography mt={3} textAlign={'center'} variant='h3'>About Us</Typography>
            <Box mb={3} />
            <div dangerouslySetInnerHTML={{ __html: about_us_page }} />
            <Box mb={3} />
        </Container>
    )
}

export default AboutPage
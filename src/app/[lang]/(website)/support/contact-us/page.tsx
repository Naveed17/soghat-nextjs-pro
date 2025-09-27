import { Box, Grid2 as Grid, Card, CardContent, Container, Typography, Paper, Stack, List, ListItem, ListItemIcon, ListItemText, Link } from '@mui/material'
import { fetchWebsiteContent } from '@src/actions';
import React from 'react'
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SocialList from './_components/socialList';
import ContactUsForm from './_components/contactUsForm';
import { Metadata } from 'next/types';
export const metadata: Metadata = {
    title: "Contact Us"
}
async function ContactUsPage() {

    const data = await fetchWebsiteContent();
    const { website_address, website_twitter_link, website_instagram_link, website_phone, website_email, website_facebook_link } = data?.WebsiteContentFind;


    return (
        <Container maxWidth="lg">
            <Typography mt={3} textAlign={'center'} variant='h3'>Contact Us</Typography>
            <Typography mb={3} textAlign='center' color="text.secondary" variant='subtitle1'>Any question or remarks? Just write us a message!</Typography>
            <Card sx={{ boxShadow: '0px 0px 20px -10px rgb(177, 176, 176)' }}>
                <CardContent sx={{ p: 1, '&.MuiCardContent-root': { p: 1 } }}>
                    <Grid container spacing={5}>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Paper sx={{ height: 1, borderRadius: 2, bgcolor: 'grey.800', boxShadow: 'none', p: 5 }}>
                                <Stack spacing={6}>
                                    <Stack>
                                        <Typography variant='h4' color="common.white">Contact Information</Typography>
                                        <Typography color='text.secondary'>Say something to start a live chat!</Typography>
                                    </Stack>
                                    <List>
                                        <ListItem component={Link} href={`tel:${website_phone}`}>
                                            <ListItemIcon sx={{ color: 'white' }}>
                                                <PhoneIcon color="inherit" />
                                            </ListItemIcon>
                                            <ListItemText primaryTypographyProps={{ color: 'common.white' }} primary={website_phone} />
                                        </ListItem>
                                        <ListItem component={Link} href={`mailto:${website_phone}`}>
                                            <ListItemIcon sx={{ color: 'white' }}>
                                                <EmailIcon color="inherit" />
                                            </ListItemIcon>
                                            <ListItemText primaryTypographyProps={{ color: 'common.white' }} primary={website_email} />
                                        </ListItem>
                                        <ListItem component={Link} href='https://maps.app.goo.gl/LPwTtFpv3t1DPJGM8' target='_blank'>
                                            <ListItemIcon sx={{ color: 'white' }}>
                                                <LocationOnIcon color="inherit" />
                                            </ListItemIcon>
                                            <ListItemText primaryTypographyProps={{ color: 'common.white' }} primary={website_address} />
                                        </ListItem>
                                    </List>
                                    <SocialList {...{ website_twitter_link, website_instagram_link, website_facebook_link }} />
                                </Stack>
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 12, md: 7 }}>
                            <ContactUsForm />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Box mb={3} />
        </Container>

    )
}

export default ContactUsPage
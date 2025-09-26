'use client'
import React from 'react'
import FooterStyled from './overrides/footerStyle'
import { Box, Container, Fab, FormControl, InputBase, List, ListItem, Paper, Skeleton, Stack, Typography, useMediaQuery, Link as MuiLink } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import { supportData } from './config'
import TelegramIcon from '@mui/icons-material/Telegram';
import { useAppSelector } from '@lib/redux/store'
import FacebookIcon from "@themes/overrides/icons/facebookIcon";
import InstaIcon from "@themes/overrides/icons/InstaIcon";
import ThreadsIcon from "@themes/overrides/icons/threadsIcon";
import TwitterIcon from "@themes/overrides/icons/twitterIcon";
import LinkedinIcon from "@themes/overrides/icons/linkedinIcon";
import YoutubeIcon from "@themes/overrides/icons/youtubeIcon";
import { usePathname } from 'next/navigation'
import { getImageUrl } from '@src/utils/getImageUrl'

function Footer() {
    const pathname = usePathname();
    const nope = getImageUrl('baseUrl', '/assets/website/images/nope.svg');
    let isLoginPage = pathname.split('/').at(-1)
    if (isLoginPage === 'login-register') {
        return null
    }

    const isMobile = useMediaQuery('(max-width: 768px)');
    const { websiteContent, data } = useAppSelector(state => state.websiteContent)
    const brands = data?.brands || [];
    const sellers = data?.featured_sellers || []
    const hasSocial = websiteContent?.website_facebook_link !== null ||
        websiteContent?.website_instagram_link !== null ||
        websiteContent?.website_linkedin_link !== null ||
        websiteContent?.website_threads_link !== null ||
        websiteContent?.website_youtube_link !== null ||
        websiteContent?.website_twitter_link !== null;

    return (
        <FooterStyled>
            <Container maxWidth="lg">
                <Stack className='footer-content-container'>
                    <Stack spacing={2}>
                        <Link href="/">

                            <Image
                                height={50}
                                width={isMobile ? 150 : 180}
                                alt="company logo"
                                src={websiteContent ? getImageUrl('baseUrl', `/${websiteContent?.footer_logo}`) : nope}
                                priority
                            />


                        </Link>
                        <Typography>
                            {websiteContent?.website_copyright}
                        </Typography>
                        {hasSocial && (
                            <Stack spacing={1}>
                                <Typography variant='h5' fontWeight={600}>
                                    Follow us
                                </Typography>
                                <List disablePadding className='social-list'>


                                    {websiteContent?.website_facebook_link !== null &&
                                        <ListItem>
                                            <Link target='_blank' href={websiteContent?.website_facebook_link || ""}>
                                                <FacebookIcon />
                                            </Link>
                                        </ListItem>
                                    }
                                    {websiteContent?.website_instagram_link !== null &&
                                        <ListItem>
                                            <Link target='_blank' href={websiteContent?.website_instagram_link || ""}>
                                                <InstaIcon />
                                            </Link>
                                        </ListItem>
                                    }
                                    {websiteContent?.website_linkedin_link !== null &&
                                        <ListItem>
                                            <Link target='_blank' href={websiteContent?.website_linkedin_link || ""}>
                                                <LinkedinIcon />
                                            </Link>
                                        </ListItem>
                                    }
                                    {websiteContent?.website_threads_link !== null &&
                                        <ListItem>
                                            <Link target='_blank' href={websiteContent?.website_threads_link || ""}>
                                                <ThreadsIcon />
                                            </Link>
                                        </ListItem>
                                    }
                                    {websiteContent?.website_youtube_link !== null &&
                                        <ListItem>
                                            <Link target='_blank' href={websiteContent?.website_youtube_link || ""}>
                                                <YoutubeIcon />
                                            </Link>
                                        </ListItem>
                                    }
                                    {websiteContent?.website_twitter_link !== null &&
                                        <ListItem>
                                            <Link target='_blank' href={websiteContent?.website_twitter_link || ""}>
                                                <TwitterIcon />
                                            </Link>
                                        </ListItem>
                                    }




                                </List>

                            </Stack>
                        )}

                    </Stack>
                    <Stack spacing={4}>
                        <Typography className='title' variant='h5' fontWeight={600}>
                            Brands
                        </Typography>
                        <List disablePadding >

                            {data ? brands.slice(0, 6).map((item: { name: string, href: string }, idx: number) =>
                            (
                                <ListItem disablePadding sx={{ py: 0.6 }} key={idx}>
                                    <Link className='link' href={`/listing/brands/${(item.name).replace(/ /g, "-")}`}>
                                        {item.name || ''}
                                    </Link>
                                </ListItem>
                            )
                            ) : <Typography>No Brand Found</Typography>}

                        </List>

                    </Stack>
                    <Stack spacing={4}>
                        <Typography className='title' variant='h5' fontWeight={600}>
                            Sellers
                        </Typography>
                        <List disablePadding >
                            {data ? sellers.slice(0, 6).map((item: any, idx: number) =>

                            (
                                <ListItem disablePadding sx={{ py: 0.6 }} key={idx}>
                                    <Link
                                        className="link"
                                        href={`/seller/${item.id}`}
                                    >
                                        {item.name || ''}
                                    </Link>
                                </ListItem>
                            )
                            ) : <Typography>No Seller Found</Typography>}

                        </List>

                    </Stack>
                    <Stack spacing={4}>
                        <Typography className='title' variant='h5' fontWeight={600}>
                            Support
                        </Typography>
                        <List disablePadding >
                            {supportData.map((item: { label: string, href: string }, idx: number) =>

                            (
                                <ListItem disablePadding sx={{ py: 0.6 }} key={idx}>
                                    <Link className='link' href={item.href}>
                                        {item.label}
                                    </Link>
                                </ListItem>
                            )
                            )}

                        </List>

                    </Stack>
                    <Stack spacing={4}>
                        <Typography className='title' variant='h5' fontWeight={600}>
                            Subscribe
                        </Typography>
                        <Stack spacing={2}>
                            <Typography component='div'>
                                Email us at  <MuiLink underline='none' color='primary' href={`mailto:${websiteContent?.website_email}`} fontWeight={600}>{websiteContent?.website_email}</MuiLink>
                            </Typography>
                            <Typography component='div'>
                                You can also text our support team at: <MuiLink underline='none' color='primary' fontWeight={600} href={`tel:${websiteContent?.website_phone}`}>{websiteContent?.website_phone}</MuiLink>
                            </Typography>
                        </Stack>
                        <Paper className='news-letter-wrap'>
                            <FormControl fullWidth>
                                <InputBase placeholder='Email Address' />
                            </FormControl>
                            <Fab size='small' color='primary'>
                                <TelegramIcon />
                            </Fab>
                        </Paper>
                    </Stack>
                </Stack>
            </Container>
            <Stack className='footer-bottom'>
                <Container maxWidth="lg">
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <Typography flex={1}>
                            {websiteContent?.website_copyright}
                        </Typography>
                        <Box maxWidth={360} height={30} alt="_payments_methods" component='img' src="/static/images/payment-icons.jpg" />
                    </Stack>
                </Container>
            </Stack>
        </FooterStyled>
    )
}

export default Footer
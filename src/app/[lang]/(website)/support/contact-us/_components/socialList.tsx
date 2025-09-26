'use client'
import React from 'react'
import Link from 'next/link';
import FacebookIcon from "@themes/overrides/icons/facebookIcon";
import InstaIcon from "@themes/overrides/icons/InstaIcon";
import TwitterIcon from "@themes/overrides/icons/twitterIcon";
import { List, ListItem } from '@mui/material';
function SocialList({ ...props }) {
    const { website_facebook_link, website_instagram_link, website_twitter_link } = props
    console.log(website_twitter_link)
    return (
        <List sx={{ display: 'flex', gap: 2, pl: 2, li: { bgcolor: 'white', transition: 'all .3s', borderRadius: 4, justifyContent: 'center', width: 25, height: 25, svg: { fontSize: 18 }, a: { lineHeight: 1.5, display: 'flex', }, '&:hover': { bgcolor: 'primary.main', svg: { color: 'white' } } } }} disablePadding className='social-list'>
            {website_facebook_link !== "" &&
                <ListItem disablePadding>
                    <Link target='_blank' href={website_facebook_link || ""}>
                        <FacebookIcon />
                    </Link>
                </ListItem>
            }
            {website_instagram_link !== "" &&
                <ListItem disablePadding>
                    <Link target='_blank' href={website_instagram_link || ""}>
                        <InstaIcon />
                    </Link>
                </ListItem>
            }


            {website_twitter_link !== null &&
                <ListItem disablePadding>
                    <Link target='_blank' href={website_twitter_link || ""}>
                        <TwitterIcon />
                    </Link>
                </ListItem>
            }




        </List>
    )
}

export default SocialList
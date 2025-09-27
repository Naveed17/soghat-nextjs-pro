'use client'
import * as React from 'react';
import { Toolbar, List, ListItem, Stack, IconButton, Typography, Container, useMediaQuery } from '@mui/material';
import HeaderStyled from './overrides/headerStyle'
import Image from 'next/image';
import Link from 'next/link';
import { ProfileMenu } from '@src/components/menus';
import StyledBadge from './overrides/cartStyled';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { MainSearch } from '@src/components/mainSearch';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MobileSearch } from '@src/components/mainSearch';
import { selectCart } from '@lib/redux/cart';
import { useAppSelector } from '@lib/redux/store';
import { useRouter, usePathname } from 'next/navigation';
import { getImageUrl } from '@src/utils/getImageUrl';
export default function AppBar({ ...props }) {
    const pathname = usePathname();
    let headerNotShow = pathname.split('/').at(-1);
    const searchNotShow = pathname.split('/').at(-1) === 'profile' || pathname.split('/').at(-1) === 'order-complete'
    const { session } = props
    const router = useRouter();
    const matches = useMediaQuery('(min-width: 992px)');
    const isMobile = useMediaQuery('(max-width: 768px)');
    const headerRef = useRef<HTMLDivElement>(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [isScrolled, setScrolled] = useState<boolean>(false);
    let { cart, total } = useAppSelector(selectCart);
    const { websiteContent } = useAppSelector(state => state.websiteContent);
    const { wishlist } = useAppSelector(state => state.wishlist)
    const nope = getImageUrl('baseUrl', '/assets/website/images/nope.svg');


    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScrolled(true)

        } else {
            setScrolled(false)
        }
    };

    React.useEffect(() => {
        const headerElement = headerRef.current;
        if (headerElement) {
            setHeaderHeight(headerElement.clientHeight);
            document.body.style.paddingTop = `${headerHeight + 32}px`;

        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [headerHeight, isScrolled]);
    const listVariant = {
        hidden: { opacity: 0, top: -10 },
        visible: {
            opacity: 1,
            top: 3,
        },
    };
    const calculateCartLength = (cart: any[]) => {
        return cart.reduce((total, item) => {
            return total + item.variant.filter((variant: any) => variant.quantity > 0).length;
        }, 0);
    };
    const cartLength = calculateCartLength(cart);
    if (headerNotShow === 'login-register' || headerNotShow === "contact-us" || headerNotShow === 'forget-password') {
        return null
    }
    return (
        <motion.div layout>
            <HeaderStyled key='header' position="fixed" ref={headerRef}>
                <Container maxWidth='lg'>
                    <Toolbar>
                        <Link href="/" className='logo_anchor'>
                            <Image
                                height={50}
                                width={matches ? 180 : 150}
                                alt="company logo"
                                src={websiteContent ? getImageUrl('baseUrl', `/${websiteContent?.header_logo}`) : nope}
                                priority
                            />
                        </Link>
                        {!isMobile && (
                            <List className='menu'
                                component={motion.ul}
                                variants={listVariant}
                                animate={isScrolled ? "hidden" : "visible"}

                            >
                                <ListItem>
                                    <StyledBadge badgeContent={wishlist.length || 0} color="primary">
                                        <Link href="/wishlist">
                                            Wishlist
                                        </Link>
                                    </StyledBadge>
                                </ListItem>
                                <ListItem>
                                    <Link href="/order-tracking">
                                        Order Tracking
                                    </Link>
                                </ListItem>
                            </List>
                        )}

                        <Stack direction='row' alignItems='center' spacing={1}>
                            <ProfileMenu session={session} />
                            {matches && (
                                <Stack direction='row' alignItems='center' spacing={2}>
                                    <IconButton onClick={() => router.push('/cart')} aria-label="cart">
                                        <StyledBadge badgeContent={cartLength || 0} color="primary">
                                            <ShoppingCartOutlinedIcon sx={{ fontSize: 28 }} />
                                        </StyledBadge>
                                    </IconButton>
                                    <Stack>
                                        <Typography variant='body2' fontSize={12} color='text.secondary'>Your Cart</Typography>
                                        <Typography fontWeight={600} fontSize={13}>Rs {cart.length > 0 && total || 0}</Typography>
                                    </Stack>
                                </Stack>
                            )}
                        </Stack>
                    </Toolbar>
                    {!searchNotShow && <Toolbar className='search-container'>
                        {!isMobile ? <MainSearch isScrolled={isScrolled} /> : <MobileSearch />}
                    </Toolbar>
                    }

                </Container>
            </HeaderStyled>

        </motion.div>
    );
}

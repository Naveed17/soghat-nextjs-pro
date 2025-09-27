"use client"
import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Drawer, IconButton, Paper, Toolbar, useMediaQuery } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StyledBadge from '../../header/components/overrides/cartStyled';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useRouter } from 'next/navigation';
import { CategoryDrawer } from '@components/drawer';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useAppSelector } from '@lib/redux/store';
import { selectCart } from '@lib/redux/cart';
import { useSession } from '@src/hooks/useSession';
const navData = [
    {
        label: "Home",
        icon: <HomeOutlinedIcon />,
        href: "/"
    },
    {
        label: "Categories",
        icon: <CategoryOutlinedIcon />,
        href: "/"
    },
    {
        label: "Cart",
        icon: <ShoppingCartOutlinedIcon />,
        href: "/cart"
    },
    {
        label: "Wishlist",
        icon: <FavoriteOutlinedIcon />
        , href: "/wishlist"
    },
    {
        label: "Account",
        icon: <AccountCircleOutlinedIcon />
        , href: "/user/login-register"
    }
]
export default function SimpleBottomNavigation() {
    const session = useSession();
    const { user } = session
    const [value, setValue] = React.useState(0);
    const router = useRouter();
    let { cart } = useAppSelector(selectCart);
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const calculateCartLength = (cart: any[]) => {
        return cart.reduce((total, item) => {
            return total + item.variant.filter((variant: any) => variant.quantity > 0).length;
        }, 0);
    };
    const cartLength = calculateCartLength(cart);
    const matches = useMediaQuery('(min-width: 992px)');
    React.useEffect(() => {

        if (open) {
            document.body.classList.add("lock-scrollbar");


        } else {
            document.body.classList.remove("lock-scrollbar");
        }

        // Cleanup when the component unmounts
        return () => {
            document.body.classList.remove("lock-scrollbar");
        };
    }, [open]);
    if (matches) {
        return null;
    }

    return (
        <>
            <Paper sx={{ position: 'fixed', zIndex: 999, bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        if (navData[newValue].label === 'Categories') {
                            toggleDrawer(true)();
                            return;
                        }
                        if (navData[newValue].label === 'Account' && user) {
                            router.push('/user/profile');
                            return;
                        }
                        router.push(navData[newValue].href);

                    }}
                    sx={{

                        '.MuiBottomNavigationAction-root ': {
                            px: .5,
                            minWidth: 70,
                        }
                    }}
                >
                    {
                        navData.map((item, index) => {
                            return (
                                <BottomNavigationAction key={index} label={item.label} icon={item.label === "Cart" ?
                                    <StyledBadge badgeContent={cartLength || 0} color="primary">
                                        {item.icon}
                                    </StyledBadge> : item.icon} />
                            )
                        })
                    }



                </BottomNavigation>
            </Paper>
            <Toolbar />
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Toolbar>
                    <IconButton>
                        <KeyboardBackspaceIcon onClick={toggleDrawer(false)} />
                    </IconButton>
                </Toolbar>
                <Toolbar>
                    <CategoryDrawer handleClose={() => toggleDrawer(false)()} />
                </Toolbar>
            </Drawer>
        </>

    );
}

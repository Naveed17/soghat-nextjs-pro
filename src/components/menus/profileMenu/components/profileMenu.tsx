'use client'
import React from 'react'
import ProfileMenuStyled from './overrides/profileMenuStyled'
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Divider, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import { logOut } from '@src/actions';
import { useAppDispatch } from '@lib/redux/store';
import { resetCart } from '@lib/redux/cart';
function ProfileMenu({ ...props }) {
    const dispatch = useAppDispatch()
    const { session } = props
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleList = (href: string) => {
        handleClose();
        router.push(href);
    }

    return (
        <>
            <ProfileMenuStyled
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="extended">
                <MenuIcon fontSize='small' />
                <AccountCircleIcon fontSize='large' sx={{ ml: 1.5 }} />
            </ProfileMenuStyled>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                disableScrollLock
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                slotProps={{
                    paper: {
                        sx: {
                            minWidth: 200,
                            borderRadius: 3
                        }
                    }
                }}
            >
                {
                    !session ?
                        [
                            {
                                title: 'Login',
                                href: '/user/login-register?login'
                            },
                            {
                                title: 'Sign Up',
                                href: '/user/login-register?signup'
                            },


                        ].map((item: any) => (
                            <MenuItem onClick={() => handleList(item.href)} key={item.title}>{item.title}</MenuItem>
                        ))
                        :
                        <div>
                            {
                                [
                                    {
                                        title: 'Profile',
                                        href: '/user/profile'
                                    },

                                ].map((item: any) => (
                                    <MenuItem onClick={() => handleList(item.href)} key={item.title}>{item.title}</MenuItem>
                                ))
                            }
                            <MenuItem onClick={async () => {
                                await logOut();
                                window.location.reload();
                                dispatch(resetCart())
                                handleClose();

                            }}>Log Out</MenuItem>
                        </div>
                }


                <Divider />
                {
                    [
                        {
                            title: 'About Us',
                            href: '/support/about-us'
                        },
                        {
                            title: 'Contact Us',
                            href: '/support/contact-us'
                        },

                    ].map((item: any) => (
                        <MenuItem onClick={() => handleList(item.href)} key={item.title}>{item.title}</MenuItem>
                    ))
                }



            </Menu >
        </>
    )
}

export default ProfileMenu
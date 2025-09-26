'use client'
import React from 'react'
import { AsideStyled } from './overrides/asideStyle'
import { Collapse, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '@lib/redux/store';
import { setOpenFilterListing, openFilterListing } from '@lib/redux/base'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useRouter } from 'next/navigation'

function Aside({ ...props }) {
    const { handleClose } = props;
    console.log('props', props);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { data } = useAppSelector(state => state.websiteContent)
    const open = useAppSelector(openFilterListing)
    const categories = data?.categories || [];

    return (
        <AsideStyled>
            <Typography variant='h6' fontWeight={600}>Shop Categories</Typography>
            <Divider className='underline' />
            <List sx={{ mt: 1 }}>
                {
                    categories.map((item: any, idx: number) => {
                        return (
                            <React.Fragment key={item.id}>
                                <ListItem disablePadding onClick={() => dispatch(setOpenFilterListing(open === idx ? null : idx))}>
                                    <ListItemIcon sx={{
                                        svg: {
                                            transform: open === idx ? 'rotate(90deg)' : 'none', transition: 'all 0.3s ease-in-out',
                                            transformOrigin: 'center center',
                                        }
                                    }}>
                                        <KeyboardArrowRightIcon sx={{ fontSize: 16 }} />
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItem>
                                <Collapse in={
                                    open === idx}>
                                    <List disablePadding className='sub-cat'>
                                        {

                                            item?.sub_cat.map((sub: any) => (
                                                <>
                                                    <ListItem onClick={(e) => { router.push(`/listing/${sub.slug}/${sub.type}`); handleClose() }} sx={{ py: 0, flexDirection: 'column', alignItems: 'flex-start' }} key={sub.id}>
                                                        <ListItemText primary={sub.name} />
                                                    </ListItem>
                                                    <List disablePadding className='sub-sub-cat'>
                                                        {
                                                            sub?.sub_sub_cat.map((sub_sub: any) => (
                                                                <ListItem onClick={(e) => { router.push(`/listing/${sub_sub.slug}/${sub_sub.type}`); handleClose() }} disablePadding sx={{ py: 0 }} key={sub_sub.id}>
                                                                    <ListItemText primary={sub_sub.name} />
                                                                </ListItem>
                                                            ))
                                                        }
                                                    </List>
                                                </>
                                            ))


                                        }
                                    </List>
                                </Collapse>
                            </React.Fragment>

                        )
                    })
                }
            </List>


        </AsideStyled>
    )
}

export default Aside
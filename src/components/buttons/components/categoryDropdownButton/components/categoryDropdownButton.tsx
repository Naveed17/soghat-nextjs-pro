'use client'
import { Button, List, ListItem, ListItemText, Stack, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import DropdownContainer from './overrides/dropdownStyle';
import { motion } from 'framer-motion';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRouter } from 'next/navigation';
function CategoryDropdownButton({ ...props }) {
    const router = useRouter();
    const [isHovered, setHovered] = useState(false)
    const { categories } = props;
    const handleMouseEnter = () => {
        setHovered(true)
    }
    const handleMouseLeave = () => {
        setHovered(false)
    }
    const variants = {
        open: { opacity: 1, y: 1, },
        closed: { opacity: 0, y: 20, }
    }
    const matches = useMediaQuery('(max-width: 992px)');
    if (matches) {
        return null;
    }

    return (
        <DropdownContainer>
            <Button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} size='large' variant='contained' startIcon={
                <MenuIcon />
            }>Shop by Category</Button>
            <List onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='dropdown' component={motion.ul}
                variants={variants}
                animate={isHovered ? "open" : "closed"}
                initial="closed"
                {...(!isHovered && {
                    sx: {
                        visibility: "hidden"
                    }
                })}

            >
                {
                    categories.map((category: any) => {
                        return (
                            <ListItem
                                disablePadding
                                secondaryAction={
                                    <ChevronRightIcon fontSize='small' sx={{ color: theme => theme.palette.divider }} />
                                }
                                key={category.id}>
                                <Stack
                                    onClick={(e) => { router.push(`/listing/${category.slug}/${category.type}`) }}
                                    className='item-wrapper' sx={{ cursor: 'pointer' }} p={1} pr={4.5}>
                                    <ListItemText primary={category.name} />
                                </Stack>


                                <List className='dropdown sub-cat'>
                                    {
                                        category.sub_cat.map((child: any) => {
                                            return (

                                                <ListItem disablePadding key={child.id}
                                                    secondaryAction={
                                                        <ChevronRightIcon fontSize='small' sx={{ color: theme => theme.palette.divider }} />
                                                    }

                                                >
                                                    <Stack className='item-wrapper' sx={{ cursor: 'pointer' }} p={1} pr={4.5} onClick={(e) => { router.push(`/listing/${child.slug}/${child.type}`) }}>
                                                        <ListItemText primary={child.name} />
                                                    </Stack>
                                                    <List className='dropdown sub-cat'>
                                                        {
                                                            child.sub_sub_cat.map((sub_child: any) => {
                                                                return (
                                                                    <ListItem disablePadding key={sub_child.id}
                                                                    >
                                                                        <Stack className='item-wrapper' sx={{ cursor: 'pointer' }} p={1} pr={4.5} onClick={(e) => { router.push(`/listing/${sub_child.slug}/${sub_child.type}`) }}>
                                                                            <ListItemText primary={sub_child.name} />
                                                                        </Stack>

                                                                    </ListItem>
                                                                )
                                                            })
                                                        }
                                                    </List>

                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                            </ListItem>
                        )
                    })
                }

            </List>
        </DropdownContainer>
    )
}

export default CategoryDropdownButton

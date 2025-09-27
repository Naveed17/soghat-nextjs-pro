'use client'
import { openDrawerListing, setOpenDrawerListing } from '@lib/redux/base'
import { useAppSelector, useAppDispatch, } from '@lib/redux/store'
import { Button, useMediaQuery } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune';
import React from 'react'

function FilterButton() {
    const matches = useMediaQuery('(max-width: 992px)');
    const dispatch = useAppDispatch()
    const openDrawer = useAppSelector(openDrawerListing)
    if (!matches) {
        return null;
    }
    return (
        <Button
            color='primary'
            startIcon={<TuneIcon sx={{ transform: 'rotate(90deg)' }} />}
            onClick={() => dispatch(setOpenDrawerListing(!openDrawer))}
        >Filter</Button>
    )
}

export default FilterButton
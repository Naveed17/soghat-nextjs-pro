"use client"
import { Card, CardContent, CardHeader, Collapse, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import ProfileForm from './profileForm'
import { Icon } from '@iconify/react';
import OrderTable from './orderTable';
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function profile({ ...props }): React.JSX.Element {
    const { user } = props;
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <>
            <Tabs sx={{ mb: 4, button: { minHeight: 50 } }} value={value} onChange={handleChange} >
                <Tab iconPosition='start' icon={<Icon icon="solar:user-id-bold" width="24" height="24" />} label="Profile" {...a11yProps(0)} />
                <Tab iconPosition='start' icon={<Icon icon="solar:bag-2-bold" width="22" height="22" />} label="Orders" {...a11yProps(1)} />
            </Tabs>
            <Collapse in={value === 0} timeout="auto" unmountOnExit>
                <ProfileForm user={user} />
            </Collapse>
            <Collapse in={value === 1} timeout="auto" unmountOnExit>
                <OrderTable />
            </Collapse>

        </>
    )
}

import { Card, CardContent, CardHeader, Container, Typography } from '@mui/material'
import React from 'react'
import { getSession } from '@lib/session'
import Profile from './_components/profile';
export const metadata = {
    title: 'Profile',
    description: '',
};
async function ProfilePage() {
    const { user } = await getSession();


    return (
        <Container maxWidth="lg">
            <Profile {...{ user }} />
        </Container>
    )
}

export default ProfilePage
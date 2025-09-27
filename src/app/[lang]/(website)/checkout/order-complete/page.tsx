import React from 'react'
import OrderComplete from './_components/orderComplete'
import { getSession } from '@lib/session';
import { Button, Container, Paper, Typography } from '@mui/material';

async function OrderCompletePage() {
    const session = await getSession();

    if (!session) {
        return (
            <Container>
                <Paper sx={{ p: 5, textAlign: 'center', mb: 3, minHeight: 420, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant='h4' color='error'>
                        You are not logged in

                        Please login to continue


                    </Typography>
                    <Button href='/user/login-register?login' variant='contained' color='error' sx={{ mt: 3 }}>Goto Login</Button>
                </Paper>
            </Container>
        );
    }
    return (
        <>
            <OrderComplete />
        </>
    )
}

export default OrderCompletePage
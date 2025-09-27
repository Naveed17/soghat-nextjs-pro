'use client'
import { Box, Card, CardContent, Container, Fab, Stack, Typography } from '@mui/material';
import React from 'react'

import './user.css'
import LoginForm from './loginFrom';
import SignUpForm from './signupForm';
import { useSearchParams } from 'next/navigation'


function LoginRegisterContainer() {
    const query = useSearchParams() as unknown as string;
    const [isLogin, setIsLogin] = React.useState(`${query}` === "login=" ? false : `${query}` === 'signup=' ? true : false);
    return (
        <Stack height={'100vh'}
            sx={{ background: 'url("/static/images/login-signup-bg.jpg")', backgroundSize: 'cover' }}
        >
            <Container maxWidth="lg" sx={{ height: 1 }}>
                <Card sx={{ maxWidth: 700, height: 'unset', width: 1, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', minHeight: 500, }}>
                    <CardContent>
                        <Stack className={`container ${isLogin ? "right-panel-active" : ""}`}>
                            <Stack className='form-container sign-up-container'>
                                <SignUpForm />
                            </Stack>
                            <Stack className='form-container sign-in-container'>
                                <LoginForm />
                            </Stack>
                            <div className="overlay-container">
                                <Stack bgcolor='primary.main' className="overlay">
                                    <Box className="overlay-panel overlay-left">
                                        <Typography variant='h3'>Welcome Back!</Typography>
                                        <Typography mb={1}>To keep connected with us please login with your personal info</Typography>
                                        <Fab className='ghost' variant='extended' size='small' onClick={() => setIsLogin(!isLogin)}>Sign In</Fab>
                                    </Box>
                                    <Box className="overlay-panel overlay-right">
                                        <Typography variant='h3'>Hello, Friend!</Typography>
                                        <Typography mb={1}>Enter your personal details and start journey with us</Typography>
                                        <Fab className='ghost' variant='extended' size='small' onClick={() => setIsLogin(!isLogin)}>Sign Up</Fab>
                                    </Box>
                                </Stack>
                            </div>
                        </Stack>
                    </CardContent>
                </Card>

            </Container>
        </Stack>
    )
}

export default LoginRegisterContainer
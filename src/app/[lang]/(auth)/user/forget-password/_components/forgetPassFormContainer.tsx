'use client'
import { Box, Card, CardContent, Container, Fab, Stack, Typography } from '@mui/material';
import React from 'react'

import './user.css'
import { useSearchParams } from 'next/navigation'
import ForgetPassForm from './forgetPassForm';
import Link from 'next/link';
import Image from 'next/image';

function ForgetPassFormContainer() {

    return (
        <Stack height={'100vh'}
            sx={{ background: 'url("/static/images/login-signup-bg.jpg")', backgroundSize: 'cover' }}
        >
            <Container maxWidth="lg" sx={{ height: 1 }}>
                <Card sx={{ maxWidth: 800, height: 'unset', width: 1, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', minHeight: 500, }}>
                    <CardContent>
                        <Stack className={`container right-panel-active`}>
                            <Stack p={3} alignItems='center' className='form-container sign-up-container'>
                                <Link href="/">
                                    <Image
                                        height={50}
                                        width={180}
                                        alt="company logo"
                                        src="/static/images/website_logo.svg"
                                        priority
                                    />
                                </Link>
                                <ForgetPassForm />
                            </Stack>

                            <div className="overlay-container">
                                <Stack bgcolor='primary.main' className="overlay">
                                    <Box className="overlay-panel overlay-left">
                                        <Typography variant='h3'>Forget Password!</Typography>
                                        <Typography>To reset your password, please enter your email address.</Typography>
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

export default ForgetPassFormContainer
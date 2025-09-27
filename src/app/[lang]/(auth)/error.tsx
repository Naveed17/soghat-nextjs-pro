'use client';

import { useEffect } from 'react';
import { Box, Button, Typography, Container } from '@mui/material';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error('error caught:', error);
    }, [error]);

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                textAlign: 'center',
            }}
        >
            <Typography variant="h3" color="error" gutterBottom>
                Something went wrong!
            </Typography>
            <Typography variant="body1" color="textSecondary">
                {error.message || 'An unexpected error occurred. Please try reloading the page.'}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={reset}
                sx={{ mt: 2 }}
            >
                Reload Page
            </Button>
        </Container>
    );
}

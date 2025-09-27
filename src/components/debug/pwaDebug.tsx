'use client';
import { Button, Box } from '@mui/material';

export default function PWADebug({ onShowPWA, onShowLogin }: { onShowPWA: () => void; onShowLogin: () => void }) {
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <Box position="fixed" top={10} right={10} zIndex={9999} sx={{ display: 'flex', gap: 1 }}>
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={onShowPWA}
      >
        Test PWA
      </Button>
      <Button
        size="small"
        variant="contained"
        color="secondary"
        onClick={onShowLogin}
      >
        Test Login
      </Button>
    </Box>
  );
}
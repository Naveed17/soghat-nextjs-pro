'use client';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

interface LoginPromptDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginPromptDialog({ open, onClose }: LoginPromptDialogProps) {
  const router = useRouter();

  const handleLogin = () => {
    onClose();
    router.push('/user/login-register');
  };

  const handleDismiss = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleDismiss} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Icon icon="mdi:account-circle" width={32} />
        Join Our Community
        <IconButton onClick={handleDismiss} sx={{ ml: 'auto' }}>
          <Icon icon="mdi:close" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box textAlign="center" py={2}>
          <Typography variant="h6" gutterBottom>
            Unlock exclusive features
          </Typography>
          <Typography color="text.secondary" mb={2}>
            Sign up or log in to save favorites, track orders, and get personalized recommendations.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
            <Box textAlign="center">
              <Icon icon="mdi:heart" width={24} color="primary" />
              <Typography variant="caption" display="block">Wishlist</Typography>
            </Box>
            <Box textAlign="center">
              <Icon icon="mdi:truck" width={24} color="primary" />
              <Typography variant="caption" display="block">Track Orders</Typography>
            </Box>
            <Box textAlign="center">
              <Icon icon="mdi:star" width={24} color="primary" />
              <Typography variant="caption" display="block">Recommendations</Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={handleDismiss} sx={{ minWidth: 'fit-content' }} color="inherit">
          Maybe Later
        </Button>
        <Button onClick={handleLogin} variant="contained" fullWidth>
          Sign In / Sign Up
        </Button>
      </DialogActions>
    </Dialog>
  );
}
'use client';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, IconButton } from '@mui/material';
import { Icon } from '@iconify/react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAInstallDialogProps {
  open: boolean;
  onClose: () => void;
  deferredPrompt: BeforeInstallPromptEvent | null;
}

export default function PWAInstallDialog({ open, onClose, deferredPrompt }: PWAInstallDialogProps) {
  console.log('PWA Dialog rendered - Open:', open, 'DeferredPrompt:', !!deferredPrompt);
  
  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
    } else {
      alert('To install this app:\n\n• Chrome: Click the install icon in the address bar\n• Safari: Tap Share > Add to Home Screen\n• Firefox: Look for the install option in the menu');
    }
    onClose();
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa-install-dismissed', 'true');
    onClose();
  };

  if (!open) {
    console.log('PWA Dialog not showing - open is false');
    return null;
  }
  
  console.log('PWA Dialog is showing!');

  return (
    <Dialog open={open} onClose={handleDismiss} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Icon icon="mdi:cellphone-arrow-down" width={32} />
        Install App
        <IconButton onClick={handleDismiss} sx={{ ml: 'auto' }}>
          <Icon icon="mdi:close" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box textAlign="center" py={2}>
          <Typography variant="h6" gutterBottom>
            Get the best experience
          </Typography>
          <Typography color="text.secondary" mb={2}>
            Install our app for faster access, offline browsing, and push notifications.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
            <Box textAlign="center">
              <Icon icon="mdi:lightning-bolt" width={24} color="primary" />
              <Typography variant="caption" display="block">Faster</Typography>
            </Box>
            <Box textAlign="center">
              <Icon icon="mdi:wifi-off" width={24} color="primary" />
              <Typography variant="caption" display="block">Offline</Typography>
            </Box>
            <Box textAlign="center">
              <Icon icon="mdi:bell" width={24} color="primary" />
              <Typography variant="caption" display="block">Notifications</Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={handleDismiss} color="inherit">
          Not Now
        </Button>
        <Button onClick={handleInstall} variant="contained" fullWidth>
          Install App
        </Button>
      </DialogActions>
    </Dialog>
  );
}
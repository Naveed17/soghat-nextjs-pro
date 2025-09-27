'use client';
import { useEffect, useState } from 'react';
import { PWAInstallDialog, LoginPromptDialog } from '@src/components/dialogs';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function StartupProvider({ children }: { children: React.ReactNode }) {
  const [showPWADialog, setShowPWADialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    let pwaTimer: NodeJS.Timeout;
    let loginTimer: NodeJS.Timeout;
    let mounted = true;

    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('PWA install prompt available');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      
      if (!dismissed && !isStandalone && mounted) {
        console.log('Showing PWA dialog in 2 seconds');
        pwaTimer = setTimeout(() => {
          if (mounted) {
            console.log('PWA dialog should show now');
            setShowPWADialog(true);
          }
        }, 2000);
      }
    };

    const checkLoginStatus = async () => {
      try {
        const session = await fetch('/api/auth/session');
        const data = await session.json();
        const user = data?.user?.user ?? null;
        
        console.log('Login check - User:', user ? 'logged in' : 'not logged in');
        
        if (!user && mounted) {
          const lastPrompt = localStorage.getItem('login-prompt-time');
          const now = Date.now();
          
          if (!lastPrompt || now - parseInt(lastPrompt) > 60 * 1000) {
            console.log('Showing login dialog in 8 seconds');
            loginTimer = setTimeout(() => {
              if (mounted) {
                console.log('Login dialog should show now');
                setShowLoginDialog(true);
                localStorage.setItem('login-prompt-time', now.toString());
              }
            }, 8000);
          }
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    // Immediate PWA check - always show for testing
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    
    console.log('PWA Check - Standalone:', isStandalone, 'Dismissed:', dismissed);
    console.log('PWA Dialog will show in 2 seconds for testing');
    
    // Always show PWA dialog for testing (remove !dismissed condition)
    if (!isStandalone && mounted) {
      pwaTimer = setTimeout(() => {
        if (mounted) {
          console.log('PWA dialog showing now!');
          setShowPWADialog(true);
        }
      }, 2000);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    checkLoginStatus();
    
    return () => {
      mounted = false;
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      if (pwaTimer) clearTimeout(pwaTimer);
      if (loginTimer) clearTimeout(loginTimer);
    };
  }, []);

  return (
    <>
      {children}
      {/* Debug buttons for development */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 9999, display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setShowPWADialog(true)}
            style={{ padding: '8px 12px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Test PWA
          </button>
          <button 
            onClick={() => setShowLoginDialog(true)}
            style={{ padding: '8px 12px', backgroundColor: '#9c27b0', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Test Login
          </button>
          <button 
            onClick={() => {
              localStorage.removeItem('pwa-install-dismissed');
              localStorage.removeItem('login-prompt-time');
              console.log('LocalStorage cleared');
            }}
            style={{ padding: '8px 12px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Clear
          </button>
        </div>
      )}
      <PWAInstallDialog 
        open={showPWADialog} 
        onClose={() => setShowPWADialog(false)}
        deferredPrompt={deferredPrompt}
      />
      <LoginPromptDialog 
        open={showLoginDialog} 
        onClose={() => setShowLoginDialog(false)}
      />
    </>
  );
}
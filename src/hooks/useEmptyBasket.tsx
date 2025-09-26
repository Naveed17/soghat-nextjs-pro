'use client';

import { useEffect, useRef } from 'react';
const useRouteChangeHandler = (onRouteChange: () => void) => {
    const previousPath = useRef<string | null>(null);
    useEffect(() => {
        // Save original methods
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;

        // Polyfill pushState and replaceState
        history.pushState = function (...args) {
            const result = originalPushState.apply(this, args);
            window.dispatchEvent(new Event('pushState'));
            return result;
        };

        history.replaceState = function (...args) {
            const result = originalReplaceState.apply(this, args);
            window.dispatchEvent(new Event('replaceState'));
            return result;
        };

        const handleRouteChange = () => {
            if (previousPath.current !== window.location.pathname) {
                onRouteChange();
                previousPath.current = window.location.pathname;
            }
        };

        // Listen for route changes
        window.addEventListener('popstate', handleRouteChange);
        window.addEventListener('pushState', handleRouteChange);
        window.addEventListener('replaceState', handleRouteChange);

        // Initialize the previous path
        previousPath.current = window.location.pathname;

        return () => {
            // Cleanup listeners and restore original methods
            window.removeEventListener('popstate', handleRouteChange);
            window.removeEventListener('pushState', handleRouteChange);
            window.removeEventListener('replaceState', handleRouteChange);
            history.pushState = originalPushState;
            history.replaceState = originalReplaceState;
        };
    }, [onRouteChange]);
};

export default useRouteChangeHandler;

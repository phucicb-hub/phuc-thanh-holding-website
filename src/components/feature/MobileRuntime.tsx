import { useEffect } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { StatusBar, Style } from '@capacitor/status-bar';
import { useLocation, useNavigate } from 'react-router-dom';

export default function MobileRuntime() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    void StatusBar.setStyle({ style: Style.Light });
    void StatusBar.setBackgroundColor({ color: '#ffffff' });
    void Keyboard.setResizeMode({ mode: KeyboardResize.Body });

    const backListener = CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack && window.history.length > 1) {
        navigate(-1);
      } else {
        void CapacitorApp.exitApp();
      }
    });

    const urlListener = CapacitorApp.addListener('appUrlOpen', ({ url }) => {
      try {
        const openedUrl = new URL(url);
        const nextPath = `${openedUrl.pathname}${openedUrl.search}${openedUrl.hash}`;
        if (nextPath && nextPath !== '/') navigate(nextPath);
      } catch {
        // Ignore malformed external URLs.
      }
    });

    return () => {
      void backListener.then((listener) => listener.remove());
      void urlListener.then((listener) => listener.remove());
    };
  }, [navigate]);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return null;
}

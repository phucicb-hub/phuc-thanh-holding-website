import { useEffect, useRef } from 'react';

// Type definitions for ScrollCraft runtime
export interface ScrollCraftInstance {
  destroy: () => void;
  layout?: () => void;
}

declare global {
  interface Window {
    ScrollCraft?: {
      mount: (root: HTMLElement | Document, options?: Record<string, unknown>) => ScrollCraftInstance;
      reduce: (forceReduced?: boolean) => void;
      instances: ScrollCraftInstance[];
    };
  }
}

export function useScrollCraft() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let instance: ScrollCraftInstance | null = null;

    const initEngine = async () => {
      try {
        if (!window.ScrollCraft) {
          // Dynamically import scrollcraft runtime
          await import('./scrollcraft.js');
        }

        if (window.ScrollCraft && containerRef.current) {
          instance = window.ScrollCraft.mount(containerRef.current);
        }
      } catch (err) {
        console.warn('ScrollCraft mount deferred or fallback:', err);
      }
    };

    const timer = setTimeout(initEngine, 50);

    return () => {
      clearTimeout(timer);
      if (instance) {
        try {
          instance.destroy();
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  return containerRef;
}

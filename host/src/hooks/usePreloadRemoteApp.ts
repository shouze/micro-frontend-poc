import { useCallback } from "react";

export function usePreloadRemoteApp() {
    const preloadManifest = useCallback(async (manifestUrl: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'fetch';
      link.href = manifestUrl;
      document.head.appendChild(link);
    }, []);
  
    return { preloadManifest };
  }
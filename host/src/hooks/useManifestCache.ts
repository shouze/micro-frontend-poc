import { useEffect, useState } from "react";
import { loadManifest } from "../utils/manifest-loader";

const manifestCache = new Map<string, Promise<void>>();

export function useManifestCache(manifestUrl: string, baseUrl: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!manifestCache.has(manifestUrl)) {
      manifestCache.set(
        manifestUrl,
        loadManifest(manifestUrl, baseUrl)
      );
    }

    manifestCache.get(manifestUrl)!
      .then(() => setIsLoading(false))
      .catch(err => {
        setError(err);
        manifestCache.delete(manifestUrl);
      });
  }, [manifestUrl, baseUrl]);

  return { isLoading, error };
}
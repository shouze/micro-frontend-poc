import { RemoteManifest } from '../types/remote-app';

export async function loadManifest(manifestUrl: string, baseUrl: string) {
    const manifest: RemoteManifest = await fetch(manifestUrl).then(r => r.json());
    
    const entry = Object.entries(manifest).find(([_, value]) => value.isEntry);
    if (!entry) {
        throw new Error('No entry point found in manifest');
    }
  
    const loadedModules = new Set<string>();
    
    async function loadDependencies(mod: string) {
      if (loadedModules.has(mod)) {
        console.log('Already loaded', mod);
        return;
      }
      loadedModules.add(mod);
      const url = baseUrl + '/' + manifest[mod].file;
      console.log('Loading remote app: ', url);

      await import(/* @vite-ignore */ url);
    }
  
    await loadDependencies(entry[0]);
  }
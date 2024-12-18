import { useManifestCache } from '../hooks/useManifestCache';
import type { RemoteAppConfig } from '../types/remote-app';
import { Loader } from './Loader';

export function RemoteApp({ config }: { config: RemoteAppConfig }) {
  const baseUrl = new URL(config.manifestUrl).origin;
  console.log(`manifestUrl: ${config.manifestUrl}`);
  const { isLoading, error } = useManifestCache(config.manifestUrl, baseUrl);

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <Loader />;

  const Component = config.webComponentTag;
  return <Component {...config.attributes} />;
}

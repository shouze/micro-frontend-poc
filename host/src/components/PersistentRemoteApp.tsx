import { useState, useEffect } from 'react';
import { RemoteAppConfig } from '../types/remote-app';
import { LazyRemoteApp } from './LazyRemoteApp';

interface PersistentRemoteAppProps {
  config: RemoteAppConfig;
  isActive: boolean;
  style?: React.CSSProperties;
}

export function PersistentRemoteApp({ config, isActive, style }: PersistentRemoteAppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isActive) {
      setMounted(true);
    }
  }, [isActive]);

  if (!mounted) return null;

  return (
    <div
      style={{
        display: isActive ? 'block' : 'none',
        ...style
      }}
    >
      <LazyRemoteApp config={config} />
    </div>
  );
}

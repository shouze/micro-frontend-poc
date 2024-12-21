import { RemoteAppConfig } from '../types/remote-app';
import { LazyRemoteApp } from './LazyRemoteApp';

interface ActiveRemoteAppProps {
  config: RemoteAppConfig;
  isActive: boolean;
  style?: React.CSSProperties;
}

const ActiveRemoteApp = ({ config, isActive, style }: ActiveRemoteAppProps) => {
  if (!isActive) return null;

  return (
    <div style={{...style}}>
      <LazyRemoteApp config={config} />
    </div>
  );
}

export default ActiveRemoteApp;
import { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import type { RemoteAppConfig } from '../types/remote-app';
import { useSpeculationRules } from '../hooks/useSpeculationRules';
import { Counter } from './Counter';
import { Loader } from './Loader';

interface LayoutProps {
  children: React.ReactNode;
  remoteApps: RemoteAppConfig[];
}

const Layout = ({ children, remoteApps }: LayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const rootUrls = remoteApps.map((app) => app.routes[0]);
  useSpeculationRules(rootUrls);

  return (
    <div className="layout">
      <motion.aside initial={false} animate={{ width: isCollapsed ? 64 : 240 }} className="sidebar">
        <button onClick={() => setIsCollapsed(!isCollapsed)}>{isCollapsed ? '→' : '←'}</button>
        <nav>
          {remoteApps.map((app) => (
            <NavLink
              key={app.name}
              to={app.routes[0]}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {app.name}
            </NavLink>
          ))}
        </nav>
        <Counter />
      </motion.aside>
      <main className="content">
        <Suspense fallback={<Loader/>}>{children}</Suspense>
      </main>
    </div>
  );
};

export default Layout;

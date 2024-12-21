import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import type { RemoteAppConfig } from './types/remote-app';
import ActiveRemoteApp from './components/ActiveRemoteApp';
import { useEffect } from 'react';
import './App.css';

const remoteApps: RemoteAppConfig[] = [
  {
    name: 'Tasks',
    routes: ['/tasks', '/tasks/*'],
    manifestUrl: 'http://localhost:4173/manifest.wc.json',
    webComponentTag: 'task-web-component',
    attributes: {
      'loading-delay': '800',
      'route-basename': '/tasks',
      'api-baseurl': 'http://localhost:4173/api',
      'data-uuid': crypto.randomUUID()
    }
  },
  {
    name: 'Calendar',
    routes: ['/calendar', '/calendar/*'],
    manifestUrl: 'http://localhost:4174/manifest.wc.json',
    webComponentTag: 'calendar-web-component',
    attributes: {
      'loading-delay': '1500',
      'route-basename': '/calendar',
      'api-baseurl': 'http://localhost:4174/api',
      'data-uuid': crypto.randomUUID()
    }
  }
];

function App() {
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    document.startViewTransition?.(() => {
      document.documentElement.setAttribute('data-route', currentPath);
    });
  }, [currentPath]);

  return (
    <Layout remoteApps={remoteApps}>
      {remoteApps.map((app) => (
        <ActiveRemoteApp
          key={app.name}
          config={app}
          isActive={app.routes.some((route) => currentPath.startsWith(route.replace('/*', '')))}
          style={{
            viewTransitionName: `remote-app-${app.name.toLowerCase()}`
          }}
        />
      ))}
      <Routes location={location}>
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        {remoteApps.map((app) => (
          <Route
            key={app.name}
            path={`${app.routes[0]}/*`}
            element={<div />} // Empty element to capture sub-routes
          />
        ))}
      </Routes>
    </Layout>
  );
}

export default function WrappedApp() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  );
}

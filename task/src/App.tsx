import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { TaskList } from './components/TaskList';
import './App.css';
import { Counter } from './components/Counter';
import { InfoModal } from './components/InfoModal';

interface AppProps {
  apiBaseUrl: string;
  basename?: string;
  loadingDelay?: number;
}

export function App({ apiBaseUrl, basename, loadingDelay }: AppProps) {
  const toggleTask = (taskId: number) => {
    console.log('toggling task', taskId);
  };

  return (
    <BrowserRouter
      basename={basename}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <h1>Task App yo</h1>
        <Counter />
      </div>
      <h2>how to wrap a react app into a web component</h2>
      <InfoModal />
      <nav className="nav-menu">
        <NavLink
          to="/intro"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          1. Intro
        </NavLink>
        <NavLink
          to="/build-app-as-web-component"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          2. Build
        </NavLink>
        <NavLink
          to="/dev-as-web-component"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          3. Dev/DX
        </NavLink>
        <NavLink
          to="/stylesheets"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          4. StyleSheets
        </NavLink>
        <NavLink
          to="/shadow-root"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          5. ShadowRoot
        </NavLink>
        <NavLink
          to="/sentry"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          6. Sentry
        </NavLink>
        <NavLink to="/qa" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          7. QA
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/intro" replace />} />
        <Route
          path="/:listId"
          element={
            <TaskList apiBaseUrl={apiBaseUrl} onToggle={toggleTask} loadingDelay={loadingDelay} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

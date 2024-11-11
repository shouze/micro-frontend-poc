import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { TaskList } from './components/TaskList';
import './App.css';

interface AppProps {
  apiBaseUrl: string;
  basename?: string;
}

export function App({ apiBaseUrl, basename }: AppProps) {
  const toggleTask = (taskId: number) => {
    console.log('toggling task', taskId);
  }
  
  return (
    <BrowserRouter basename={basename} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <h1>Task App</h1>
      <h2>how to wrap a react app into a web component</h2>
      <nav className="nav-menu">
      <NavLink 
          to="/intro"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          1. Intro
        </NavLink>
        <NavLink 
          to="/build-app-as-web-component"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          2. Build
        </NavLink>
        <NavLink 
          to="/dev-as-web-component"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          3. Dev/DX
        </NavLink>
        <NavLink 
          to="/stylesheets"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          4. StyleSheets
        </NavLink>
        <NavLink 
          to="/shadow-root"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          5. ShadowRoot
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/intro" replace />} />
        <Route path="/:listId" element={
          <TaskList 
            apiBaseUrl={apiBaseUrl}
            onToggle={toggleTask}
            />} 
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
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
      <nav className="nav-menu">
        <NavLink 
          to="/build-app-as-web-component"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Build web component app
        </NavLink>
        <NavLink 
          to="/second-list"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Second List
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/build-app-as-web-component" replace />} />
        <Route path="/:listId" element={<TaskList apiBaseUrl={apiBaseUrl} onToggle={toggleTask} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
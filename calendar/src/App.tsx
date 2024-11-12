import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Calendar from './components/Calendar';
import './App.css';

interface AppProps {
  basename?: string;
  loadingDelay?: number;
}

function App({ basename, loadingDelay }: AppProps) {
  const today = new Date();
  
  return (
    <BrowserRouter basename={basename} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={
          <Navigate to={`/${today.getFullYear()}/${today.getMonth() + 1}`} replace />
        } />
        <Route path="/:year/:month" element={<Calendar loadingDelay={loadingDelay} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import ProjectList from './pages/ProjectList';
import DPRForm from './pages/DPRForm';
import Toast from './components/Toast';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Toast />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/projects" element={
              <ProtectedRoute><ProjectList /></ProtectedRoute>
            } />
            <Route path="/dpr/:projectId" element={
              <ProtectedRoute><DPRForm /></ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
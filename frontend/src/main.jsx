import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import LoginPage from './pages/LoginPage';
import { AppProvider } from './contexts/AppContext';
import { WebSocketProvider } from './contexts/WebSocketContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <WebSocketProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chat/" element={<App />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </WebSocketProvider>
    </AppProvider>
  </StrictMode>,
);
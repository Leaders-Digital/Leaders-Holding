import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Note: deliberately NOT wrapped in <React.StrictMode> — Strict Mode double-invokes
// effects in dev, which would initialise the Three.js scene twice.
createRoot(document.getElementById('root')).render(<App />);

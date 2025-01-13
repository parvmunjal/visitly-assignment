import React from 'react';
import ReactDOM from 'react-dom/client'; // Importing 'react-dom/client' instead of 'react-dom'
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot for React 18
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

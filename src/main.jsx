import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Correct import
import './index.css';
import App from './App.jsx';

// Use the imported `createRoot` function
const root = createRoot(document.getElementById('root'));

// Wrap your app in StrictMode if needed
root.render(
  <>
   <App />
  </>
   
  
);